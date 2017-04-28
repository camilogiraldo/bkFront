import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private api: ApiService, private route: ActivatedRoute, private  router: Router) { }

  private token;
  private response = {};
  private message;
  ngOnInit() {
    this.verifyEmail();
  }

  verifyEmail(){
    this.route
      .queryParams
      .subscribe(params => this.token = params['token'])
    this.api.verifyEmail(this.token)
      .subscribe(data => {
        this.response = data;
          if(data.success == false) {
            this.message = 'Login failed. Try again';
            setTimeout(function(){
              this.message = '';
              this.router.navigate(['/login'])
            }.bind(this) , 2000)
            console.log('bad response')
          } else {
            this.token = data.token;
            localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));
            this.router.navigate(['/products'])
          }
      }, err => {
          this.message = err.message;
          setTimeout(function(){
            this.message = '';
            this.router.navigate(['/login'])
          }.bind(this) , 2000)
      })
  }
}
