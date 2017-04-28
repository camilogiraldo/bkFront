import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Product } from '../app/model/product';
import { Observable   } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class ApiService {

  loggedIn: Boolean;
  private currentUser: {};

  constructor(private http: Http) { }

  private apiUrl = 'https://stage-bkbackend.herokuapp.com'

  jwtHelper: JwtHelper = new JwtHelper();


  isLoggedIn() {
    if (this.getSessionData()) {
      return true;
    } else {
      return false;
    }
  }
  //return the decoded information from token
  getSessionData(){
    if(localStorage.getItem('currentUser')) {
      this.currentUser = this.jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token);
      return this.currentUser
    } else {
      return null;
    }
  }

  //Returns the token for the currentUser
  getSessionToken(){
    if(localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).token;
    }else {
      return null
    }
  }

  getProducts() {
    return this.http.get(this.apiUrl + '/products')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(console.log(error) || 'Server error'))
  }

  getProductByID(id: String) {
    console.log(id)
    return this.http.get(this.apiUrl + '/products/' + id)
      .map((res: Response) => res.json() )
      .catch((error:any) => Observable.throw(console.log(error) || 'Server error'))
  }

  getMemberInfo(token: Object) {
    let headers = new Headers({ 'Content-type': 'application/json' });
    headers.append('Authorization',  token.toString());
    let options = new RequestOptions({ headers: headers })

    return this.http.get( this.apiUrl + '/api/memberinfo', options)
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(console.log(error) || 'Server error'))
  }

  signupUser(user: Object) {
    let bodyString = JSON.stringify(user);
    let headers = new Headers({ 'Content-type': 'application/json' });  // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers})

    return this.http.post(this.apiUrl + '/api/signup', user, options )
        .map((res: Response) => {

          return res.json();
        })
        .catch((error:any) => Observable.throw(console.log(error) || 'Server error'))

  }

  loginUser(body: Object) {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-type': 'application/json' });  // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers})

    return this.http.post(this.apiUrl + '/api/authenticate', bodyString, options )
        .map((res: Response) =>
         res.json()
        )
        .catch((res => {
          // The error callback (second parameter) is called
          return Observable.throw(res.json())
        }))
  }

  createProduct(body: Object){
    let token = this.getSessionToken();
    let bodyString = JSON.stringify(body);
    console.log(bodyString)
    let headers = new Headers({ 'Content-type': 'application/json'})
    headers.append('Authorization',  token.toString());
    let options = new RequestOptions({ headers: headers })

    return this.http.post( this.apiUrl + '/create', bodyString, options)
      .map((res: Response )=> res.json())
      .catch((error:any) => Observable.throw(console.log(error) || 'Server error'))
  }


  verifyEmail (params: String){
    return this.http.get(this.apiUrl + '/api/verify_email?token=' + params.toString())
      .map((res: Response) => res.json() )
      .catch((res => {
        // The error callback (second parameter) is called
        return Observable.throw(res.json())

      }))
  }

  getCountries(){
    return this.http.get('https://restcountries.eu/rest/v2/all')
      .map((res: Response) => res.json())
      .catch((error:any) => Observable.throw(console.log(error) || 'Server error'))
  }

}
