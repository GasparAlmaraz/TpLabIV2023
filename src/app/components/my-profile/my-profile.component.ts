import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { User } from 'src/app/models/user/user';
import { CoinService } from 'src/app/services/coin/coin.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  myData: User | undefined;
  myPokemons: number[] | undefined;
  myPokeballs: number | undefined;
  updates = 0;

  selectedPokemon : Pokemon | undefined;

  constructor(private userService: UserService, private coinService: CoinService) {}

  ngOnInit(){
    this.userService.currentUser$.subscribe((user) => {
      this.myData = user;
      this.myPokeballs = user?.wallet;
      this.myPokemons = user?.ownedPokemonIds;
    })
  }

  GetPokemon(pokemon : Pokemon){
    this.selectedPokemon = pokemon;
    console.log(this.selectedPokemon);
    
  }
}
