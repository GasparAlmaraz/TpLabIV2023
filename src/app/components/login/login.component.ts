import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUser: User = new User();
  loginForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void{
    this.loginForm = new FormGroup({
      'username': new FormControl(this.loginUser.username, [Validators.required, Validators.email]),
      'password': new FormControl(this.loginUser.password, [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    });
  }

  get username() { return this.loginForm?.get('username') }
  get password() { return this.loginForm?.get('password') }

  onSubmit() {
    this.loginUser.username = this.username?.value;
    this.loginUser.password = this.password?.value;

    this.userService.login(this.loginUser, (success, message) => {
      
      alert(message);
      if(success){
        
        this.router.navigate(['catalog']);
      }

      this.loginUser.username = '';
      this.loginUser.password = '';
    })
  }
}
