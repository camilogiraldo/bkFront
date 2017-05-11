import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  private product = { type: "Type 1", files: {} };
  private files = [];
  private message = '';
  constructor(private api: ApiService, private router: Router, private http: Http, private el: ElementRef) { }

  ngOnInit() {

  }

  publish() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();

    if (fileCount > 0) {
      //append the key name 'photo' with the first file in the element
      for (let i = 0; i < fileCount; i++ ){
        formData.append('photo', inputEl.files.item(i));
      }
    }
    formData.append('body', JSON.stringify(this.product) )
    this.api.createProduct(formData)
      .subscribe(data => {
        this.product = data
        if (data.success == true) {
          this.router.navigate(['/'])
        } else {
          this.message = data.message;
        }
      }, err => console.log(err))
  }

  onChangeType(deviceValue) {
    this.product.type = deviceValue;
  }



}
