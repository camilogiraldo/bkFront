import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],

})
export class NavigationComponent implements OnInit {

  loggedIn: Boolean;
  currentUser: {};
  constructor(private api: ApiService, private router: Router) { }

  jwtHelper: JwtHelper = new JwtHelper();

  ngOnInit() {
    this.currentUser = this.api.getSessionData()
    this.loggedIn = this.api.isLoggedIn();

  }


  logout(){
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl['/products'];
  }

}
