import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { CoinService } from 'src/app/services/coin.service';
import { QuestionGameService } from 'src/app/services/question-game.service';

@Component({
  selector: 'app-question-game',
  templateUrl: './question-game.component.html',
  styleUrls: ['./question-game.component.css']
})
export class QuestionGameComponent {

  pokemon : Pokemon | undefined;
  reward = 1;
  onStreak = false;
  streak = 0;
  success = false;

  responseInput = "";

  constructor(private coinService : CoinService, private questionService : QuestionGameService){}

  async prepareCuestion(){
    this.pokemon =  await this.questionService.getRandomPokemon();
    if(this.pokemon != undefined) this.reward = this.coinService.setPokemonValue(this.pokemon);
  }

  ngOnInit(){
    this.prepareCuestion();
  }

  ngOnChange(changes : SimpleChanges){
    if(changes['streak']){
      setTimeout(() => this.prepareCuestion(), 7000);
    }
  }

  anwserQuestion(){
    if(this.pokemon != undefined){
      var result = this.questionService.rewardPlayer(this.pokemon, this.onStreak, this.streak, this.responseInput);

      if(result> 0){
        this.success = true;
        this.coinService.addCoins(result);
      }
    }
  }
}
