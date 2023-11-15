import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { User } from 'src/app/models/user/user';
import { CoinService } from 'src/app/services/coin/coin.service';
import { QuestionGameService } from 'src/app/services/question-game/question-game.service';
import { UserService } from 'src/app/services/user/user.service';

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
    private questionService : QuestionGameService,
    private userService : UserService
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
      var result = this.questionService.rewardPlayer(this.pokemon, this.onStreak, this.streak, this.responseInput.toLowerCase());

      console.log(this.userService.CurrentUser);
      
  
      if (result > 0) {
        this.success = true;
        this.reward = result;
        this.coinService.addCoins(result);
        this.showSuccessMessage = true;
        this.showFailureMessage = false;
        this.streak = this.streak + 1;
        this.onStreak = true;
        
        if(this.userService.CurrentUser != undefined) {
          let updateUser = this.userService.CurrentUser;
          if(updateUser.wallet != undefined && updateUser.answeredQuestions != undefined){
            updateUser.wallet += this.reward;
            updateUser.answeredQuestions += 1;
            this.userService.updateUserFile(updateUser).subscribe({
              next: (data => {
                this.userService.CurrentUser = data;
              })
            });;
          }
          else {
            updateUser.wallet = this.coinService.getCoins();
            updateUser.answeredQuestions = 1;
            this.userService.updateUserFile(updateUser).subscribe({
              next: (data => {
                this.userService.CurrentUser = data;
              })
            });
          }
        }
      } else {
        this.success = false;
        this.reward = result;
        this.showSuccessMessage = false;
        this.showFailureMessage = true;
        this.streak = 0;
        this.onStreak = false;
      }
    }
    

    setTimeout(async () => {
      this.pokemon = await this.questionService.getRandomPokemon();
      this.showFailureMessage = false;
      this.showSuccessMessage = false;
      this.responseInput = '';
    }, 5000);
  }
}
