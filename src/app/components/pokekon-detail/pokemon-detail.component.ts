import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: '.app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent {

  @Input()
  pokemon : Pokemon | undefined;

  pokemonDetails : Pokemon | undefined;
  
  isLoaded = false;

  constructor(private pokemonService: PokemonService){}

  ngOnInit(){
  }
  

  ngOnChanges(changes : SimpleChanges) {
    if(changes['pokemon']) {
      this.loadInformation();
      this.isLoaded = true;
    }
  }

  async loadInformation() {
    this.pokemonDetails = await this.pokemonService.loadPokemonDetail(this.pokemon?.id);
  }

  cleanInformation(){
    this.isLoaded = false;
    this.pokemonDetails = undefined;
  }
}
