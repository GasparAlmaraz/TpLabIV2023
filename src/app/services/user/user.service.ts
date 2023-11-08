import { Injectable } from '@angular/core';


import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser: User | undefined;

  constructor() { }

  generateUserFile(createdUser: User, callback: (success: boolean, message: string) => void) {
    let newUser = new User();
    newUser.username = createdUser.username;
    newUser.password = createdUser.password;
    newUser.wallet = 0;
    newUser.ownedPokemonIds = new Array<number>();
  
    const filePath = `../../data/${newUser.username}.json`;

    fs.readFile(filePath)
    .then(() => {
      callback(false, `This UserName already exists, try again.`);
    })
    .catch(() => {
      let dataToSave = JSON.stringify(newUser);
      fs.writeFile(filePath, dataToSave)
        .then(() => {
          console.log("Success creating file.");
          this.currentUser = newUser;
          callback(true, `UserData created, FileName: ${newUser.username}`);
        })
        .catch((error: any) => {
          console.log(error);
          callback(false, `Something wrong occurred: ${error}`);
        });
    })
  }

  updateUserFile(userToUpdate: User, callback: (success: boolean, message: string) => void){
    const filePath = `../../data/${userToUpdate.username}.json`;

    fs.readFile(filePath)
    .then(() => {
      let dataToUpdate = JSON.stringify(userToUpdate);

      fs.writeFile(filePath, dataToUpdate)
        .then(() => {
          console.log("Success updating file.");
          this.currentUser = userToUpdate;
          callback(true, `UserData updated.`);
        })
        .catch((error: any) => {
          console.log(error);
          callback(false, `Something wrong occurred: ${error}`);
        });
    })
    .catch((error: any) => {
      console.log(error);
      callback(false, `The file does not exist: ${error}`);
    })
  }

  login(userLogin: User, callback: (success: boolean, message: string) => void){
    const filePath = `../../data/${userLogin.username}.json`;

    fs.readFile(filePath)
    .then(() => {
      console.log("Success login in.");
      this.currentUser = userLogin;
      callback(true, `Welcome ${userLogin.username}.`);
    })
    .catch((error: any) => {
      console.log(error);
      callback(false, `This user does not exist. Try register first.`);
    })
  }
}
