import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: User | undefined;
  private errorMessage: string | undefined;
  private currentUserSubject = new BehaviorSubject<User | undefined>(undefined);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  generateUserFile(createdUser: User) {
    let newUser = new User();
    newUser.username = createdUser.username;
    newUser.password = createdUser.password;
    newUser.wallet = 0;
    newUser.ownedPokemonIds = new Array<number>();
    newUser.answeredQuestions = 0;
    
    let jsonData = JSON.stringify(newUser);
    console.log("Json: " + jsonData);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<User>(`http://localhost:3001/postUser`, jsonData, httpOptions);
  }

  updateUserFile(userToUpdate: User){
    return this.http.put<User>(`http://localhost:3001/updateUser`, userToUpdate);
  }

  login(userLogin: User){
    return this.http.get<User>(`http://localhost:3001/getUser?username=${userLogin.username}&password=${userLogin.password}`);
  }

  set CurrentUser(user: User | undefined) {
    this.currentUserSubject.next(user);
  }

  get CurrentUser(): User | undefined {
    return this.currentUserSubject.value;
  }

  get Message() { return this.errorMessage }
  set Message(errorMessage: string | undefined) { this.errorMessage = errorMessage }

  get CurrentWallet() { return this.currentUser?.wallet }
  set CurrentWallet(value: number | undefined) { 
    if(this.currentUser?.wallet != undefined) this.currentUser.wallet = value;
  }

  get AnsweredQuestions() { return this.currentUser?.answeredQuestions }
  set AnsweredQuestions(correctAnswer: number | undefined) { 
    if(this.currentUser?.answeredQuestions != undefined) this.currentUser.answeredQuestions = correctAnswer;
   }
}
