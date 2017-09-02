import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Product } from '../app/model/product';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class ApiService {

  loggedIn: Boolean;
  private currentUser: { exp };
  private apiUrl = 'https://stage-bkbackend.herokuapp.com';
  // private apiUrl = 'http://localhost:3000'
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) { }
  

  isLoggedIn() {
    if (this.getSessionData()) {
      return true;
    } else {
      return false;
    }
  }

  //return the decoded information from token
  getSessionData() {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = this.jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token);
      if (this.currentUser.exp <= Date.now()) {
        localStorage.removeItem('currentUser');
        return null
      } else {
        return this.currentUser
      }
    } else {
      return null;
    }
  }

  //Returns the token for the currentUser
  getSessionToken() {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).token;
    } else {
      return null
    }
  }

  getProducts() {
    return this.http.get(this.apiUrl + '/products')
      .map((res: Response) => res.json())
      .catch((res => {
        // The error callback (second parameter) is called
        return Observable.throw(res.json())
      }))
  }

  getProductByID(id: String) {
    return this.http.get(this.apiUrl + '/products/' + id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(console.log(error) || 'Server error'))
  }


  getMemberInfo(token: Object) {
    const headers = new Headers({ 'Content-type': 'application/json' });
    headers.append('Authorization', token.toString());
    const options = new RequestOptions({ headers: headers })

    return this.http.get(this.apiUrl + '/api/memberinfo', options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(console.log(error) || 'Server error'))
  }

  addProductToCart(id: String, token: String) {
    const body = id.toString;
    const headers = new Headers({});  // ... Set content type to JSON
    const options = new RequestOptions({ headers: headers })
    headers.append('Authorization', token.toString());

    return this.http.post(this.apiUrl + '/api/addcart/' + id, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(console.log(error) || 'Server error'))
  }

  deleteProductFromCart(id: String, token: String) {
    const body = id.toString;
    const headers = new Headers({});  // ... Set content type to JSON
    const options = new RequestOptions({ headers: headers })
    headers.append('Authorization', token.toString());

    return this.http.post(this.apiUrl + '/api/deletecart/' + id, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(console.log(error) || 'Server error'))
  }

  signupUser(user: Object) {
    const bodyString = JSON.stringify(user);
    const headers = new Headers({ 'Content-type': 'application/json' });  // ... Set content type to JSON
    const options = new RequestOptions({ headers: headers })

    return this.http.post(this.apiUrl + '/api/signup', user, options)
      .map((res: Response) => {

        return res.json();
      })
      .catch((error: any) => Observable.throw(console.log(error) || 'Server error'))
  }

  getItemsInCart(token: String) {
    const headers = new Headers({ 'Content-type': 'application/json' });
    headers.append('Authorization', token.toString());

    const options = new RequestOptions({ headers: headers })
    return this.http.get(this.apiUrl + '/api/cart/', options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(console.log(error) || 'Server error'))
  }

  loginUser(body: Object) {
    const bodyString = JSON.stringify(body);
    const headers = new Headers({ 'Content-type': 'application/json' });  // ... Set content type to JSON
    const options = new RequestOptions({ headers: headers })

    return this.http.post(this.apiUrl + '/api/authenticate', bodyString, options)
      .map((res: Response) =>
        res.json()
      )
      .catch((res => {
        // The error callback (second parameter) is called
        return Observable.throw(res.json())
      }))
  }

  createProduct(body: Object) {
    const token = this.getSessionToken();
    const headers = new Headers({})
    headers.append('Authorization', token.toString());
    headers.delete('Content-type')
    const options = new RequestOptions({ headers: headers })

    return this.http.post(this.apiUrl + '/create', body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(console.log(error) || 'Server error'))
  }


  verifyEmail(params: String) {
    return this.http.get(this.apiUrl + '/api/verify_email?token=' + params.toString())
      .map((res: Response) => res.json())
      .catch((res => {
        // The error callback (second parameter) is called
        return Observable.throw(res.json())

      }))
  }

  getCountries() {
    return this.http.get('https://restcountries.eu/rest/v2/all')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(console.log(error) || 'Server error'))
  }

  updateProfileInfo(body: Object, token: Object) {
    const bodyString = JSON.stringify(body);
    const headers = new Headers({ 'Content-type': 'application/json' });  // ... Set content type to JSON
    headers.append('Authorization', token.toString());
    const options = new RequestOptions({ headers: headers })

    return this.http.patch(this.apiUrl + '/api/update_user', body, options)
      .map((res: Response) => res.json())
      .catch((res => {
        // The error callback (second parameter) is called
        return Observable.throw(res.json())

      }))
  }
}
