import { Component, OnInit, OnChanges } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {

  renderedPokemons : Pokemon[] | undefined;
  constructor(private pokemonService : PokemonService) {}

  async ngOnInit() { 
    const loadedPokemons = await this.pokemonService.loadPokemons();
    
    if (loadedPokemons) {
      this.renderedPokemons = this.renderedPokemons ? [...this.renderedPokemons, ...loadedPokemons] : loadedPokemons;
    }
    console.log(this.renderedPokemons);
    
  }
}
