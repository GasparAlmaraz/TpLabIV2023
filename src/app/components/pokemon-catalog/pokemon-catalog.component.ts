import { Component, Input } from '@angular/core';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from '../pokekon-detail/pokemon-detail.component';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-pokemon-catalog',
  templateUrl: './pokemon-catalog.component.html',
  styleUrls: ['./pokemon-catalog.component.css']
})
export class PokemonCatalogComponent {

  selectedPokemon : Pokemon | undefined;

  GetPokemon(pokemon : Pokemon){
    this.selectedPokemon = pokemon;
    console.log(this.selectedPokemon);
    
  }
}
