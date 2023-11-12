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
  submitted = false;

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
    this.submitted = true;
  
    if (this.loginForm.valid) {
      this.loginUser.username = this.loginForm.get('username')?.value;
      this.loginUser.password = this.loginForm.get('password')?.value;
      console.log(this.loginUser);

      this.userService.login(this.loginUser).subscribe({
        next: (data) => { 
          this.userService.CurrentUser = new User();
          this.userService.CurrentUser = data;
          
          if (this.userService.CurrentUser != undefined) {
            console.log(this.userService.CurrentUser);
            this.router.navigate(['/catalog']);
          }
        },
        error: (error) => { 
          this.userService.Message = error;
          console.log(this.userService.Message);
          
        },
        complete: () => console.log("login completed"),
      });
      
    }
    
  }
}
