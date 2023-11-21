import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { User } from 'src/app/models/user/user';
import { CoinService } from 'src/app/services/coin/coin.service';
import { ExchangeService } from 'src/app/services/exchange/exchange.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user/user.service';

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

  @Input() inMyProfile = false;
  message = "";

  isLogged = false;

  currentUser: User | undefined;

  get pokemonValue(): number | undefined {
    return this.pokemonDetails ? this.coinService.setPokemonValue(this.pokemonDetails) : undefined;
  }

  constructor(private pokemonService: PokemonService,
    private exchangeService: ExchangeService, 
    private coinService : CoinService,
    private sessionService: SessionService,
    private userService: UserService
    ){}

  ngOnInit(){
    this.exchangeService.message$.subscribe(message => {
      this.message = message;
    })

    this.sessionService.loggedIn$.subscribe(loggedIn => {
      this.isLogged = loggedIn;
    })

    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    })

    this.message = '';
  }

  ngOnChanges(changes : SimpleChanges) {
    if(changes['pokemon']) {
      if(this.pokemon != undefined){
        this.loadInformation();
        this.isLoaded = true;
      }
    }
  }

  async loadInformation() {
    this.pokemonDetails = await this.pokemonService.loadPokemonDetail(this.pokemon?.id);
  }

  cleanInformation(){
    this.isLoaded = false;
    this.pokemonDetails = undefined;
    this.message = '';
  }

  capturePokemon(pokemon: Pokemon) {
    if(this.pokemonValue) {
      this.exchangeService.CapturePokemon(this.pokemonValue, pokemon.id);
      this.CleanMessage();
    }
  }

  releasePokemon(pokemon: Pokemon) {
    if(this.pokemonValue){
      this.exchangeService.ReleasePokemon(this.pokemonValue, pokemon.id);
      this.CleanMessage();
    }
  }

  CleanMessage(){
    setTimeout(() => this.cleanInformation(), 5000);
  }
}
