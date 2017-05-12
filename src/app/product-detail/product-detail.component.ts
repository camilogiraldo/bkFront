import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import {MdCardModule} from '@angular/material';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private product = [];
  private id;
  constructor(private router: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.router.params
          .map(params =>{
            this.id = params['id']
          })
          .subscribe((id) => {
            this.api.getProductByID(this.id)
              .subscribe(data => {
                this.product = data
              })
          });
  }
}
