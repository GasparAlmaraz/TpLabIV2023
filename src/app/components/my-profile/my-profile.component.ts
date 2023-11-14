import { Component } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  myData: User | undefined;
  myPokemons: Pokemon[] | undefined;
  updates = 0;

}
