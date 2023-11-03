import { Injectable } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  private wallet : number = 0;

  constructor() { }

  setPokemonValue(pokemon : Pokemon) : number{
    
    if(pokemon.baseExperience != undefined){
      const x = pokemon.baseExperience;
      switch (true) {
        case (x < 50):
          return 5;
        case (x >= 50 && x < 100):
          return 10;
        case (x >= 100 && x < 150):
          return 20;
        case (x >= 150 && x < 250):
          return 50;
        case (x >= 250 && x < 300):
          return 75;
        default:
          return 99;
      }
    }

    return 1;
  }

  setWallet(currentCoins : number){
    this.wallet = currentCoins;
  }

  addCoins(reward : number){
    if(this.wallet != undefined) this.wallet += reward;
  }

  removeCoins(pay : number){
  if(this.wallet != undefined) this.wallet -= pay;
  }

  getCoins() { return this.wallet }
}
