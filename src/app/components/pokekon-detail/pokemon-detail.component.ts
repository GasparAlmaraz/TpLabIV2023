import { Component, Input, OnInit } from '@angular/core';
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
  
  isLoaded = false;

  constructor(private pokemonService: PokemonService){}

  ngOnInit(){
  }
  
  loadInformation() {
    
  }
}
