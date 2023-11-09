import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User | undefined;

  constructor(private http: HttpClient) { }

  generateUserFile(createdUser: User) {
    let newUser = new User();
    newUser.username = createdUser.username;
    newUser.password = createdUser.password;
    newUser.wallet = 0;
    newUser.ownedPokemonIds = new Array<number>();
    
    let jsonData = JSON.stringify(newUser);
    const result = this.http.post(`http://localhost:3001/postUser`, jsonData);

    return result;
  }

  updateUserFile(userToUpdate: User){
    return this.http.put(`http://localhost:3001/updateUser`, userToUpdate);
  }

  login(userLogin: User){
    
  }
}
