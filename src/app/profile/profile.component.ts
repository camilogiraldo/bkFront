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
  private loading;
  private sessionToken;
  private message;
  private messageOk;
  private newToken;
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
    this.currentUser = this.api.getSessionData();
    this.sessionToken = this.api.getSessionToken();
    this.isLogged = this.api.isLoggedIn();
    // console.log(navigator.geolocation.getCurrentPosition(this.success, this.error, this.options))
  }

  updateMemberInfo(){
    // console.log(this.currentUser)
    this.api.updateProfileInfo(this.currentUser, this.sessionToken)
    .subscribe(data => {
        this.loading = false;
        this.messageOk = data.message;
        this.newToken = data.token;
        localStorage.setItem('currentUser', JSON.stringify({ token: this.newToken }));
        setTimeout(function(){
          this.messageOk = '';
        }.bind(this) , 6000)
    }, err => {
        this.loading = false;
        this.message = err.message
        setTimeout(function(){
          this.message = '';
        }.bind(this) , 6000)
    });
  }

  onChangeType(country) {
    this.currentUser['location'] = country;
    console.log(this.currentUser)
  }

  // error(err) {
  //   console.warn('ERROR(' + err.code + '): ' + err.message);
  // };
  //
  // success(pos) {
  //   var crd = pos.coords;
  //
  //   console.log('Your current position is:');
  //   console.log('Latitude : ' + crd.latitude);
  //   console.log('Longitude: ' + crd.longitude);
  //   console.log('More or less ' + crd.accuracy + ' meters.');
  // };

  loadCountries() {
    this.api.getCountries()
      .subscribe(
      data => {
        this.countries = data
      },
      err => console.log(err))
  }
}
