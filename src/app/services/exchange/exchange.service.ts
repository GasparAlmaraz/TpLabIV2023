import { Injectable } from '@angular/core';
import { CoinService } from '../coin/coin.service';
import { UserService } from '../user/user.service';
import { SessionService } from '../session/session.service';
import { BehaviorSubject, of, startWith, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  private message = new BehaviorSubject<string>("");
  message$ = this.message.asObservable();

  constructor(
    private coinService : CoinService, 
    private userService : UserService, 
    ) { }

    CapturePokemon(pokemonValue: number, pokemonId: number) {
      this.coinService.wallet$
        .pipe(take(1))
        .subscribe(currentCoins => {
          if (currentCoins > pokemonValue) {
            this.coinService.removeCoins(pokemonValue);
            let currentUser = this.userService.CurrentUser;
    
            if (currentUser) {
              currentUser.wallet = currentCoins - pokemonValue;
              currentUser?.ownedPokemonIds?.push(pokemonId);
              this.userService.updateUserFile(currentUser).subscribe((user) => {
                if (user) {
                  this.message.next("Pokemon captured!");
                }
              });
            }
          } else {
            this.message.next("Not enough pokeballs!");
          }
        });
    }

  ReleasePokemon(pokemonValue: number, pokemonId: number) {
    let currentUser = this.userService.CurrentUser;
  
    if (currentUser) {
      
      this.coinService.wallet$.pipe(
        take(1), // to ensure we only get the initial value
        switchMap(wallet => {
          
          if (currentUser?.ownedPokemonIds?.includes(pokemonId)) {
            currentUser.wallet = this.coinService.addCoins(pokemonValue / 2);
            currentUser.ownedPokemonIds = currentUser?.ownedPokemonIds.filter(x => x != pokemonId);
  
            return this.userService.updateUserFile(currentUser);
          } else {
            // Return a dummy observable to keep the chain
            return of(null);
          }
        })
      ).subscribe(user => {
        if (user) {          
          this.message.next("Pokemon released!");
        }
      });
    }
  }

  get Message() { return this.message };
}
