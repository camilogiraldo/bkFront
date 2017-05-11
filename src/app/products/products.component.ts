import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
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
  private products = [];
  private loading = true;
  private message ='';

  constructor(private api: ApiService) {
      this.currentUser = this.api.getSessionData()
      this.isLogged = this.api.isLoggedIn();
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.api.getProducts().subscribe(data => {
        this.loading = false;
        this.products = data
    }, err => {
        this.loading = false;
        this.message = JSON.stringify(err),
        console.log(err)
        console.log(this.message)
        this.message = err.message
    });
  }

}
