import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  private product = { type: "Type 1", files: []};
  private files = [];
  private message = '';
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {

  }

  publish(){
    this.api.createProduct(this.product)
      .subscribe(data => {
        this.product = data
        if (data.success == true ){
          this.router.navigate(['/'])
        } else {
          this.message = data.message;
        }
      }, err => console.log(err))
  }

  onChangeType(deviceValue) {
      this.product.type = deviceValue;
      console.log(deviceValue)
  }

  onChangeFiles(deviceValue) {
      for (var i = 0; i < deviceValue.srcElement.files.length; i++){
        this.files[i] = deviceValue.srcElement.files[i];
        this.product.files[i] = this.files[i].name

      }
  }
}
