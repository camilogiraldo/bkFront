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
  private countries = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadCountries();
    this.currentUser = this.api.getSessionData()
    this.isLogged = this.api.isLoggedIn();
    console.log(navigator.geolocation)
  }

  updateProfile(){
    //code for update profile goes here
  }

  loadCountries(){
    this.api.getCountries()
      .subscribe(
      data =>{
        this.countries = data
      },
      err => console.log(err))

  }
}
