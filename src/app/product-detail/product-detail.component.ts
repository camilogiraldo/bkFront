import { Component, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import {MatCardModule} from '@angular/material';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private product = [];
  private id;
  private isLogged;
  private sessionToken;
  private response;
  private newUser;
  private currentUser;
  private newToken;

  constructor(private router: ActivatedRoute, private api: ApiService) {
    this.currentUser = this.api.getSessionData()
   }

  ngOnInit() {
    this.sessionToken = this.api.getSessionToken();
    this.isLogged = this.api.isLoggedIn();
    this.newUser = this.currentUser
    this.router.params
          .map(params =>{
            this.id = params['id']
          })
          .subscribe((id) => {
            this.api.getProductByID(this.id)
              .subscribe(data => {
                this.product = data
              })
          });
  }

  addToCart(product_id){
    this.api.addProductToCart(product_id, this.sessionToken).subscribe(data => {
        this.response = data;
        console.log(this.response)
        this.newToken = data.token;
        localStorage.removeItem('currentUser')
        //Updates userToken with cart updated
        localStorage.setItem('currentUser', JSON.stringify({ token: this.newToken }));
        console.log(this.response)
        this.newUser = this.api.getSessionData()
    }, err => {

    })
  }

  loginAndBuy(){

  }
}
