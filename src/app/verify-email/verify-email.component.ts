import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(private api: ApiService, private route: ActivatedRoute, private  router: Router) { }

  private token;
  private response;

  ngOnInit() {
    this.verifyEmail();
  }

  verifyEmail(){
    this.route
      .queryParams
      .subscribe(params => this.token = params['token'])
    this.api.verifyEmail(this.token)
      .subscribe(data => this.response = data)
    this.router.navigate(['/'])
  }
}
