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
  private newToken;
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
    this.api.deleteProductFromCart(product, this.sessionToken).subscribe(data => {
      this.totalAmount = 0;
      this.products = data.cart;
      this.newToken = data.token;
    
      localStorage.removeItem('currentUser');
        //Updates userToken with cart updated
      localStorage.setItem('currentUser', JSON.stringify({ token: this.newToken }));
      this.newUser = this.api.getSessionData();
      console.log(this.products.length);
      if(this.products.length > 0){
        this.products.forEach(e =>
        {
            console.log("Price" + e.price)
            console.log(e)
            this.totalAmount +=  (e.price * e.count);         
        })
      } else {
        this.totalAmount = 0;
      }
    }, err => {

    })
  }
}
