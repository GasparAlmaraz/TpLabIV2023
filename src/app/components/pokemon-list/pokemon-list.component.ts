import { Component, OnInit, OnChanges, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: '.app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {

  renderedPokemons : Pokemon[] | undefined;
  updates = 0;

  loggedIn: boolean = false;
  pokemonAvailable: number[] | undefined;

  @Input() inMyProfile = false;
  @Output() selectPokemonEvent = new EventEmitter<Pokemon>();

  
  constructor(private pokemonService : PokemonService, 
    private sessionService : SessionService, 
    private userService: UserService) {}

  ngOnInit() { 
    this.sessionService.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });

    this.pokemonService.loadPokemons(0, 25);

    this.pokemonService.pokemon$.subscribe(pokemons => {
      this.renderedPokemons = pokemons;
    })
    
    this.userService.currentUser$.subscribe((user) => {
      this.pokemonAvailable = user?.ownedPokemonIds;
    })
  }

  async ngOnChanges(changes: SimpleChanges){
    console.log(changes);
  }

  loadMorePokemons() {
    this.pokemonService.loadMorePokemons(25, (this.updates+1));
    this.updates = this.updates + 1;
  }

  erasePokemons() {
    if(this.updates > 0){
      if(this.renderedPokemons != null && this.renderedPokemons.length > 25 && this.renderedPokemons.length <= 150) {
        this.renderedPokemons?.splice(this.renderedPokemons.length-25, 25);
      }
      if(this.renderedPokemons != null && this.renderedPokemons?.length > 150){
        this.renderedPokemons?.splice(this.renderedPokemons.length-26, 26);
        this.updates = this.updates - 1;
      }
      this.updates = this.updates-1;
    }
  }

  selectPokemon(pokemon : Pokemon){
    this.selectPokemonEvent.emit(pokemon);
  }

  IsAvailable(pokemon: Pokemon){
    return this.pokemonAvailable && this.pokemonAvailable.includes(pokemon.id);
  }
}
