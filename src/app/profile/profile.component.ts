import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  imageForm: FormGroup;
  profileImageChanged = false;
  private currentUser = {};
  private isLogged;
  private loading;
  private sessionToken;
  private message;
  private messageOk;
  private newToken;
  private countries = [];
  private user = { location: "", profileImage: "//placehold.it/200" };
  private options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadCountries();
    this.currentUser = this.api.getSessionData();
    this.sessionToken = this.api.getSessionToken();
    this.isLogged = this.api.isLoggedIn();

    this.imageForm = new FormGroup({
      profileImage: new FormGroup({
        filename: new FormControl(null),
        filetype: new FormControl(null),
        filevalue: new FormControl(null)
      })
    });
  }

  updateMemberInfo() {
    this.api.updateProfileInfo(this.currentUser, this.sessionToken).subscribe(
      data => {
        this.loading = false;
        this.messageOk = data.message;
        this.newToken = data.token;
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ token: this.newToken })
        );
        setTimeout(
          function() {
            this.messageOk = "";
          }.bind(this),
          6000
        );
      },
      err => {
        this.loading = false;
        this.message = err.message;
        setTimeout(
          function() {
            this.message = "";
          }.bind(this),
          6000
        );
      }
    );
  }

  onChangeType(country) {
    this.currentUser["location"] = country;
  }

  loadCountries() {
    this.api.getCountries().subscribe(
      data => {
        this.countries = data;
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
        this.imageForm.controls["profileImage"].patchValue({
          filename: file.name,
          filetype: file.type,
          filevalue: reader.result.split(",")[1]
        });
        this.user.profileImage =
          "data:" +
          this.imageForm.controls["profileImage"].value.filetype +
          ";base64," +
          this.imageForm.controls["profileImage"].value.filevalue;
        this.profileImageChanged = true;
      };
    }
  }
}
