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
  private user = { location: '' };
  private options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadCountries();
    this.currentUser = this.api.getSessionData()
    this.isLogged = this.api.isLoggedIn();
    console.log(navigator.geolocation.getCurrentPosition(this.success, this.error, this.options))
  }

  updateProfile() {
    //code for update profile goes here
    console.log(this.user)
  }

  onChangeType(country) {
    this.user.location = country;
    console.log(country)
  }

  error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };

  success(pos) {
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log('Latitude : ' + crd.latitude);
    console.log('Longitude: ' + crd.longitude);
    console.log('More or less ' + crd.accuracy + ' meters.');
  };

  loadCountries() {
    this.api.getCountries()
      .subscribe(
      data => {
        this.countries = data
      },
      err => console.log(err))

  }
}
