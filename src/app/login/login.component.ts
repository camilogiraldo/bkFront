import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { Router } from '@angular/router';
import { User } from '../model/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  private user = {};
  private token = '';
  private message = '';
  private response = {};

  ngOnInit() {
  }

  login() {
    console.log(this.user)
    this.api.loginUser(this.user)
      .subscribe(data => {
        this.response = data;
        if (!this.response) {
          this.router.navigate(['/login'])
        }  else {
          if(data.success == false) {
            this.message = 'Login failed. Try again';
            setTimeout(function(){
              this.message = '';
            }.bind(this) , 6000)
            console.log('bad response')
          } else {
            this.token = data.token;
            localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));
            this.router.navigate(['/products'])
          }
        }
      }, err => console.log(err))


  }


}
