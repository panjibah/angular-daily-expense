import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-daily-expenses';
  loggedin = false;
  userName = '';

  constructor(private authService: AuthService) {


  }

  ngOnInit() {
    this.authService.autoLogin();
    this.authService.userSubject.subscribe(
        user => {
          this.loggedin = !!user;
          this.userName = user.email;
          console.log('logged IN' + this.loggedin);
        }
    );


  }
}
