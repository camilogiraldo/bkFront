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
  private newUser;
  private products = [];
  private totalAmount = 0;
  constructor(private api: ApiService) { }

  ngOnInit() {
        this.sessionToken = this.api.getSessionToken();
        this.getCart();
        this.newUser = this.api.getSessionData();
  }

  getCart(){
    this.api.getItemsInCart(this.sessionToken).subscribe( data => {
        this.products = data;
        data.forEach(e =>
          {
            this.totalAmount += (e.price * e.count);
          })

    }, err => {

    })
  }

  deleteFromCart(product){
    console.log("delete" + product);
  }
}
