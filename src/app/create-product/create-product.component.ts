import { Component, OnInit, ElementRef, Input } from "@angular/core";
import { ApiService } from "../api.service";
import { Router } from "@angular/router";
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

  private product = {
    name: "",
    description: "",
    type: "Type 1",
    status: "New",
    price: 0,
    files: {}
  };
  private files = [];
  private message = "";
  private currentUser;
  constructor(
    private api: ApiService,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.currentUser = this.api.getSessionData();

    this.productForm = new FormGroup({
      productName: new FormControl(null, [Validators.required]),
      productDescription: new FormControl(null, [Validators.required]),
      productType: new FormControl('Type 1', [Validators.required]),
      productStatus: new FormControl('New', [Validators.required]),
      productPrice: new FormControl('' , [Validators.required]),
      productImages: new FormGroup({
        filename: new FormControl(),
        filetype: new FormControl(),
        value: new FormControl()
      })
    });
  }

  publish() {
    const formModel = this.productForm.value
    this.api.createProduct(formModel).subscribe(
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
    const reader = new FileReader();
    if ($event.target.files && $event.target.files.length > 0) {
      const file = $event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.productForm.controls['productImages'].patchValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }
}
