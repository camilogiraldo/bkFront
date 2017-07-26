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
  @Input('newUser') newUser: String;

  loggedIn: Boolean;
  currentUser: {};
  public isCollapsed: boolean;
  public isLogged;
  constructor(private api: ApiService, private router: Router) { }

  jwtHelper: JwtHelper = new JwtHelper();

  ngOnInit() {
    this.isCollapsed = true;
  
    this.loggedIn = this.api.isLoggedIn();
    if (this.loggedIn) {
      this.currentUser = this.api.getSessionData()
    }
  }

  updateCart(){
    this.currentUser = this.api.getSessionData()
  }

  logout(){
    this.router.navigate(['/products']);
    localStorage.removeItem('currentUser');
  }

}
