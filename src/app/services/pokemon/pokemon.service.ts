import { Injectable } from '@angular/core';
import { Pokemon } from '../../models/pokemon/pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiURL = "http://localhost:3001";
  private pokemonSubject = new BehaviorSubject<Pokemon[]>([]);
  pokemon$ = this.pokemonSubject.asObservable();
  constructor(private http: HttpClient) { }

  loadPokemons =  (offset? : number, limit? : number) => {
    this.http.get<Pokemon[]>(
      this.apiURL + `/getPokemons?offset=${offset ? offset : null}&limit=${limit ? limit : null}`)
      .subscribe(pokemons => {
        this.pokemonSubject.next(pokemons);
      },
      (error) => {
        console.error('Error fetching Pokémon:', error);
        this.pokemonSubject.next([...this.pokemonSubject.value]);
      });
  }

  loadMorePokemons(offset: number, limitSetter: number){

    if(offset*limitSetter <= 125) this.http.get<Pokemon[]>(
      this.apiURL + `/getPokemons?offset=${offset*limitSetter}&limit=${offset}`).subscribe(pokemons => {
        this.pokemonSubject.next([...this.pokemonSubject.value, ...pokemons]);
      },
      (error) => {
        console.error('Error fetching Pokémon:', error);
        this.pokemonSubject.next([...this.pokemonSubject.value]);
      });

    if(offset*limitSetter == 150) this.http.get<Pokemon[]>(
      this.apiURL + `/getPokemons?offset=${offset*limitSetter}&limit=${1}`).subscribe(pokemons => {
        this.pokemonSubject.next([...this.pokemonSubject.value, ...pokemons]);
      },
      (error) => {
        console.error('Error fetching Pokémon:', error);
        this.pokemonSubject.next([...this.pokemonSubject.value]);
      });
  }

  loadPokemonDetail = (pokemonId: number | undefined) => {
    return this.http.get<Pokemon>(this.apiURL + `/getPokemonById/${pokemonId}`);
  }

  getRandomPokemon = () => {
    return this.http.get<Pokemon>(this.apiURL + `/getPokemonById/${Math.floor(Math.random() * (151 - 0) + 0)}`);
  }
}
