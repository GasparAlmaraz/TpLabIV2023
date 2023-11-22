import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  randomPokemon: Pokemon | undefined;

  constructor(private pokemonService: PokemonService){}

  getRandomPokemon(){
    this.pokemonService.getRandomPokemon().subscribe(pokemon => {
      this.randomPokemon = pokemon;
    })
  }

  ngOnInit(){
    this.getRandomPokemon()
  }
}
