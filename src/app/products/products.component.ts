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
  private isLogged;
  private products = {};

  constructor(private api: ApiService) {
      this.currentUser = this.api.getSessionData()
      this.isLogged = this.api.isLoggedIn();
  }

  jwtHelper: JwtHelper = new JwtHelper();



  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.api.getProducts().subscribe(data => this.products = data);
  }

}
