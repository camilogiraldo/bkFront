import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  public user = {};
  private token;
  private currentUser;
  private sessionToken;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.currentUser = this.api.getSessionData();
    this.sessionToken = this.api.getSessionToken();
    this.getMemberInfo()
  }

  getMemberInfo() {
    if ( this.sessionToken ) {
      console.log(this.sessionToken);
      this.api.getMemberInfo(this.sessionToken)
        .subscribe(data => this.user = data);

    } else {
      console.log('no current user')
    }

  }

}
