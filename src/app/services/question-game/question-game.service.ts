import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class QuestionGameService {

  private apiURL = "http://localhost:3001";
  constructor(private http : HttpClient) { }

  async getRandomPokemon(){
    let result = await this.http.get<Pokemon>(
      this.apiURL + `/getPokemonById/${Math.floor(Math.random() * (1000 - 152) + 152)}`)
      .toPromise();

    return result;
  }

  rewardPlayer(pokemon: Pokemon, onStreak: boolean, streak: number, response: string){
    if(pokemon?.name != undefined && response == pokemon.name){
      if(onStreak){
        switch (true) {
          case (streak < 3):
            return 1;
          case (3 >= streak || streak < 5):
            return 5;
          case (streak >= 5):
            return 10;
          default:
            return 1;
        }
      }
      return 1;
    }

    return 0;
  }
}
