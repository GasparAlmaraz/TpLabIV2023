import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../../models/pokemon/pokemon';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionGameService {

  private apiURL = "http://localhost:3001";
  constructor(private http : HttpClient) { }

  getRandomPokemons(){
    console.log(2);
    
    const requests: Observable<Pokemon>[] = [];

    for (let i = 0; i < 4; i++) {
      const request = this.http.get<Pokemon>(
        this.apiURL + `/getPokemonById/${Math.floor(Math.random() * (1000 - 152) + 152)}`
      );

      requests.push(request);
    }
    console.log(3);
    
    return forkJoin(requests);
  }

  rewardPlayer(pokemon: Pokemon, onStreak: boolean, streak: number, response: string | undefined){
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
