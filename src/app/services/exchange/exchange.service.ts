import { Injectable } from '@angular/core';
import { CoinService } from '../coin/coin.service';
import { UserService } from '../user/user.service';
import { SessionService } from '../session/session.service';
import { BehaviorSubject } from 'rxjs';

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

  CapturePokemon(pokemonValue: number, pokemonId: number){
    let currentCoins = 0;
    this.coinService.wallet$.subscribe(wallet =>{
      currentCoins = wallet;
      if(currentCoins > pokemonValue){
        this.coinService.removeCoins(pokemonValue);
        let currentUser = this.userService.CurrentUser;
  
        if(currentUser){
          currentUser?.ownedPokemonIds?.push(pokemonId);
          this.userService.updateUserFile(currentUser).subscribe((user) => {
            if(user){
              this.message.next("Pokemon captured!");
            }
          })
        }
      } else {
        this.message.next("Not enough pokeballs!");
      }
    })
  }

  ReleasePokemon(pokemonValue: number, pokemonId: number){

    let currentUser = this.userService.CurrentUser;
    let currentCoins = 0;

    this.coinService.wallet$.subscribe(wallet => {
      currentCoins = wallet;

      if(currentUser){
        if(currentUser.ownedPokemonIds?.includes(pokemonId)){
          this.coinService.addCoins(pokemonValue/2);
          this.coinService.wallet$.subscribe(wallet => {
            if(currentUser) currentUser.wallet = wallet;
          });
          currentUser.ownedPokemonIds = currentUser.ownedPokemonIds.filter(x => x != pokemonId);
          this.userService.updateUserFile(currentUser).subscribe(user => {
            if(user){
              this.message.next("Pokemon released!");
            }
          })
        }
      }
    })
    
  }

  get Message() { return this.message };
}
