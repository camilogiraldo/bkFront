import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],

})
export class NavigationComponent implements OnInit {

  loggedIn: Boolean;
  currentUser: {};
  constructor(private router: Router) { }

  jwtHelper: JwtHelper = new JwtHelper();

  ngOnInit() {
// TODO: look for a better implementation. Code reuse
    if(localStorage.getItem('currentUser')) {
      this.currentUser = this.jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token) ;
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }


  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl['/products'];
  }

}
