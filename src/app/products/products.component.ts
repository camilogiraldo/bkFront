import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { JwtHelper } from 'angular2-jwt';
import { User } from '../model/user'


@Component({
  selector: 'app-products',

  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],

})
export class ProductsComponent implements OnInit {

  private currentUser = {};
  private decodedTokenExp = {};
  private decodedTokenIsExp = {};
  constructor(private api: ApiService) {
    this.getSessionData()
  }

  jwtHelper: JwtHelper = new JwtHelper();

  getSessionData(){
    if(this.currentUser){
      this.currentUser = this.jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token) ;
      this.decodedTokenExp = this.jwtHelper.getTokenExpirationDate(JSON.parse(localStorage.getItem('currentUser')).token);
      this.decodedTokenIsExp = this.jwtHelper.isTokenExpired(JSON.parse(localStorage.getItem('currentUser')).token);
      console.log(this.currentUser)
    }

  }

  products = {};

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.api.getProducts().subscribe(data => this.products = data);
  }

}
