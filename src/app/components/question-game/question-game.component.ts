import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { CoinService } from 'src/app/services/coin/coin.service';
import { QuestionGameService } from 'src/app/services/question-game/question-game.service';

@Component({
  selector: 'app-question-game',
  templateUrl: './question-game.component.html',
  styleUrls: ['./question-game.component.css']
})
export class QuestionGameComponent {

  pokemon : Pokemon | undefined;
  reward = 0;
  onStreak = false;
  streak = 0;
  success = false;

  showSuccessMessage: boolean = false;
  showFailureMessage: boolean = false;

  responseInput : string = '';

  constructor(
    private coinService : CoinService,
    private questionService : QuestionGameService
    ){}

  async prepareCuestion(){
    this.pokemon =  await this.questionService.getRandomPokemon();
    if(this.pokemon != undefined) this.reward = this.coinService.setPokemonValue(this.pokemon);
  }

  ngOnInit(){
    this.prepareCuestion();
  }

  ngOnChange(changes : SimpleChanges){
    if(changes['streak']){
      if(this.streak > 0){
        setTimeout(() => this.prepareCuestion(), 5000);
        this.responseInput = '';
      }
    }
  }

  answerQuestion(){
    if (this.pokemon != undefined) {
      var result = this.questionService.rewardPlayer(this.pokemon, this.onStreak, this.streak, this.responseInput);
  
      if (result > 0) {
        this.success = true;
        this.reward = result;
        this.coinService.addCoins(result);
        this.showSuccessMessage = true;
        this.showFailureMessage = false;
        this.streak = this.streak + 1;
        this.onStreak = true;
      } else {
        this.success = false;
        this.reward = result;
        this.showSuccessMessage = false;
        this.showFailureMessage = true;
        this.streak = 0;
        this.onStreak = false;
      }

      console.log("Result " + result);
      
      console.log("Streak " + this.streak);
      console.log("onStreak " + this.onStreak);
      
      
    }

    console.log(this.coinService.getCoins());
    

    setTimeout(async () => {
      this.pokemon = await this.questionService.getRandomPokemon();
      this.showFailureMessage = false;
      this.showSuccessMessage = false;
    }, 5000);
  }
}
