import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  private product = { type: "Type 1", files: []};
  private files = [];
  constructor(private api: ApiService) { }

  ngOnInit() {

  }

  publish(){
    console.log(this.product.files)
    this.api.createProduct(this.product)
      .subscribe(data => {
        this.product = data
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
