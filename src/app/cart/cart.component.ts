import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private sessionToken;
  private response;

  constructor(private api: ApiService) { }

  ngOnInit() {
        this.sessionToken = this.api.getSessionToken();
        this.getCart()
  }

  getCart(){
    this.api.getItemsInCart(this.sessionToken).subscribe( data => {
        this.response = data;
        console.log(this.response)
    }, err => {

    })
  }
}
