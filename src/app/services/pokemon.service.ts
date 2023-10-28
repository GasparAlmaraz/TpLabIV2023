import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private apiURL = "http://localhost:3001"
  constructor(private http: HttpClient) { }

  loadPokemons = async (offset? : number, limit? : number) => {
    return await this.http.get<Pokemon[]>(this.apiURL + `/getPokemons?offset=${offset ? offset : null}&limit=${limit ? limit : null}`).toPromise();
  }
}
