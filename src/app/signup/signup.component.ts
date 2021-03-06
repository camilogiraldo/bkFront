import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../api.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(private api: ApiService, private router: Router) {}

  private user = { location: "" };
  private response = {};
  private message = "";
  private countries = [];
  private location;

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.api.getCountries().subscribe(
      data => {
        this.countries = data;
      },
      err => console.log(err)
    );
  }

  onChangeType(country) {
    this.user.location = country;
  }

  signup() {
    this.api.signupUser(this.user).subscribe(
      data => {
        this.response = data;
        if (!this.response) {
          this.router.navigate(["/signup"]);
        } else {
          if (data.success == false) {
            this.message = "signup failed " + data.messaage;
            setTimeout(
              function() {
                this.message = "";
              }.bind(this),
              6000
            );
            console.log("bad response");
          } else {
            //registro exitoso
            //redirigir al home or wtvr
            // TODO: backend change. for get the JWT after signup or a verification email
            this.message =
              "We have sent you a verification email. Check your inbox !";
            setTimeout(
              function() {
                this.router.navigate(["/products"]);
              }.bind(this),
              2000
            );
          }
        }
      },
      err => console.log(err)
    );
  }
}
