import { Component } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  loggedIn = false;
  
  constructor(private sesionService: SessionService, private userService: UserService) {}

  ngOnInit(){
    this.sesionService.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }
  onClick() {
    this.userService.CurrentUser = undefined;
    this.sesionService.setLoggedIn(false);
    this.sesionService.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }
}
