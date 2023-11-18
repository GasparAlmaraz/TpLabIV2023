import { Component, SimpleChanges } from '@angular/core';
import { CoinService } from 'src/app/services/coin/coin.service';
import { SessionService } from 'src/app/services/session/session.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  loggedIn = false;
  username : string | undefined;
  wallet : number | undefined;
  
  constructor(private sesionService: SessionService, private userService: UserService, private coinService: CoinService) {}

  ngOnInit(){
    this.sesionService.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });

    this.userService.currentUser$.subscribe((user) => {
      this.username = user?.username;
    });

    this.coinService.wallet$.subscribe(wallet => {
      this.wallet = wallet;
    })
  }


  onClick() {
    this.userService.CurrentUser = undefined;
    this.sesionService.setLoggedIn(false);
    this.sesionService.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }
}
