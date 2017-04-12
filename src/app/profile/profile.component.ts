import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private currentUser = {};
  private isLogged;
  private country;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.currentUser = this.api.getSessionData()
    this.isLogged = this.api.isLoggedIn();
  }

  updateProfile(){
    //code for update profile goes here
  }
}
