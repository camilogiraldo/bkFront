import { Component, OnInit, ElementRef, Input } from "@angular/core";
import { ApiService } from "../api.service";
import { Router } from "@angular/router";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { FormGroup, FormControl, Validators } from "@angular/forms";



@Component({
  selector: "app-create-product",
  templateUrl: "./create-product.component.html",
  styleUrls: ["./create-product.component.css"]
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;

  private product = { name: '',
    description: '',
    type: "Type 1",
    status: 'New',
    price: 0,
    files: {} };
  private files = [];
  private message = '';
  private currentUser;
  constructor(
    private api: ApiService,
    private router: Router,
    private http: Http,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.currentUser = this.api.getSessionData();

    this.productForm = new FormGroup({
      'productName': new FormControl(null, [Validators.required]),
      'productDescription': new FormControl(null, [Validators.required]),
      'productType': new FormControl('Type 1', [Validators.required]),
      'productStatus': new FormControl('New', [Validators.required]),
      'productPrice': new FormControl(null, [Validators.required]),
      'productImages': new FormControl(null, [Validators.required])

    })
  }

  publish() {
    let formData = new FormData();

    this.product.name = this.productForm.value.productName;
    this.product.description = this.productForm.value.productDescription;
    this.product.type = this.productForm.value.productType;
    this.product.status = this.productForm.value.productStatus;
    this.product.price = this.productForm.value.productPrice;
    this.product.files = this.productForm.value.productImages;
    
    formData.append('body', JSON.stringify(this.product));
    formData.append('photo', this.productForm.value.productImages);

    this.api.createProduct(formData)
      .subscribe(
        data => {
          this.product = data;
          if (data.success === true) {
            this.router.navigate(['/']);
          } else {
            this.message = data.message;
          }
        },
        err => console.log(err)
      );
    }

  onFileChange($event) {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
      "#photo"
    );
    const fileCount: number = inputEl.files.length;
    if (fileCount > 0) {
      for (let i = 0; i < fileCount; i++) {
        this.productForm.controls['productImages'].setValue(inputEl.files.item(i))
      }
    }
  }
}

