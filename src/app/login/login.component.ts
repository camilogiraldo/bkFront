import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../model/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  private user = {};
  private token = '';
  private message = '';
  private response = {};
  private  returnUrl: string;
 
  ngOnInit() {
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  
  }

  login() {
    this.api.loginUser(this.user)
      .subscribe(data => {
        this.response = data;
        if (!this.response) {
           this.router.navigate(['/login'])
        }  else {
          if(data.success == false) {
            this.message = data.message;
            setTimeout(function(){
              this.message = '';
            }.bind(this) , 6000)
          } else {
            this.token = data.token;
            localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));
            this.router.navigateByUrl(this.returnUrl);
          }
        }
      }, err => { this.message = JSON.stringify(err),
          this.message = err.message;
          setTimeout(function(){
            this.message = '';
          }.bind(this) , 6000)
      })
  }
}
