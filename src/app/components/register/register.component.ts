import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerUser: User = new User();
  registerForm!: FormGroup;
  submitted = false;
  success = false;
  errorMessage = '';

  constructor(private userService: UserService, private router: Router, private sessionService: SessionService) {}

  ngOnInit(): void{
    this.registerForm = new FormGroup({
      'username': new FormControl(this.registerUser.username, [Validators.required, Validators.email]),
      'password': new FormControl(this.registerUser.password, [Validators.required, Validators.minLength(8), Validators.maxLength(16)])
    });
  }

  get username() { return this.registerForm?.get('username') }
  get password() { return this.registerForm?.get('password') }

  onSubmit() {
    this.submitted = true;
    
  
    if (this.registerForm.valid) {
      this.registerUser.username = this.registerForm.get('username')?.value;
      this.registerUser.password = this.registerForm.get('password')?.value;
      
      this.userService.generateUserFile(this.registerUser).subscribe({
        next: (data) => {
          this.userService.CurrentUser = new User();
          this.userService.CurrentUser = data;

          if (this.userService.CurrentUser != undefined) {
            this.success = true;
            this.sessionService.setLoggedIn(true);
            setTimeout(() => this.router.navigate(['/catalog']), 4000);
          }
        },
        error: (error) => { 
          this.errorMessage = error.error.message;
        },
      });
    }
  }
}
