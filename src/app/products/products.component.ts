import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from '../api.service';
import { Router, CanActivate , RouterStateSnapshot } from '@angular/router';
import { User } from '../model/user'
import { MdCardModule } from '@angular/material';
import { NavigationComponent } from '../navigation/navigation.component'


@Component({
  selector: 'app-products',

  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],

})
export class ProductsComponent implements OnInit {
  

  private currentUser = { };
  private decodedTokenExp = {};
  private decodedTokenIsExp = {};
  private isLogged;
  private products = [];
  private loading = true;
  private message ='';
  private response;
  private sessionToken;
  private newToken;
  private newUser;




  constructor(private api: ApiService, private route: Router) {
      this.currentUser = this.api.getSessionData()
  }

  ngOnInit() {
    this.getProducts();
    this.isLogged = this.api.isLoggedIn();
    this.sessionToken = this.api.getSessionToken();
    this.newUser = this.currentUser 
  }

  getProducts() {
    this.api.getProducts().subscribe(data => {
        this.loading = false;
        this.products = data
    }, err => {
        this.loading = false;
        this.message = JSON.stringify(err),
        this.message = err.message
    });
  }

  addToCart(product_id){
    this.api.addProductToCart(product_id, this.sessionToken).subscribe(data => {
        this.response = data;
        this.newToken = data.token;
        localStorage.removeItem('currentUser')
        //Updates userToken with cart updated
        localStorage.setItem('currentUser', JSON.stringify({ token: this.newToken }));
        console.log(this.response)
        this.newUser =  this.api.getSessionData()
    }, err => {

    })
  }

  loginAndBuy(){
    // TODO: 
    this.route.navigate(['/login'])
  }

}
