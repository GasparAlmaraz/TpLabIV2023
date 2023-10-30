import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: '.app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent {

  pokemon : Pokemon | undefined;
  isLoaded = false;

  constructor(private pokemonService: PokemonService){}

  ngOnInit(){
    this.pokemon = new Pokemon();
  }
  
  loadInformation() {
    
  }
}
