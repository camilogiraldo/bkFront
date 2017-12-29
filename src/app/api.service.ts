import { FormGroup } from '@angular/forms';
import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Response, Headers, RequestOptions } from '@angular/http';
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
  // private apiUrl = 'https://stage-bkbackend.herokuapp.com';
  private apiUrl = 'http://localhost:3000';
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient) {}

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
      this.currentUser = this.jwtHelper.decodeToken(
        JSON.parse(localStorage.getItem('currentUser')).token
      );
      if (this.currentUser.exp <= Date.now()) {
        localStorage.removeItem('currentUser');
        return null;
      } else {
        return this.currentUser;
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
      return null;
    }
  }

  getProducts() {
    return this.http
      .get(this.apiUrl + '/products')
      .catch(res => {
        // The error callback (second parameter) is called
        return Observable.throw(res.json());
      });
  }

  getProductByID(id: String) {
    return this.http
      .get(this.apiUrl + '/products/' + id)
      .catch((error: any) =>
        Observable.throw(console.log(error) || 'Server error')
      );
  }

  getMemberInfo(token: Object) {
    const headers = new HttpHeaders().set('Content-type', 'application/json')
    headers.append('Authorization', token.toString());

    return this.http
      .get(this.apiUrl + '/api/memberinfo', { headers })
      .catch((error: any) =>
        Observable.throw(console.log(error) || 'Server error')
      );
  }

  addProductToCart(id: String, token: String) {
    const body = id.toString;
    const headers = new HttpHeaders().set('Authorization', token.toString()); // ... Set content type to JSON

    return this.http

      .post(this.apiUrl + '/api/addcart/' + id, body, {headers})
      .catch((error: any) =>
        Observable.throw(console.log(error) || 'Server error')
      );
  }

  deleteProductFromCart(id: String, token: String) {
    const body = id.toString;
    const headers = new HttpHeaders().set('Authorization', token.toString());

    return this.http
      .post(this.apiUrl + '/api/deletecart/' + id, body, {headers})
      .catch((error: any) =>
        Observable.throw(console.log(error) || 'Server error')
      );
  }

  signupUser(user: Object) {
    const bodyString = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-type', 'application/json');

    return this.http
      .post(this.apiUrl + '/api/signup', user, {headers})
      .catch((error: any) =>
        Observable.throw(console.log(error) || 'Server error')
      );
  }

  getItemsInCart(token: String) {
    const headersJson = {
      'Content-type' : 'application/json',
      'Authorization': token.toString()
    }
    const headers = new HttpHeaders(headersJson)
    // headers.append('Authorization', token.toString());

    return this.http
      .get(this.apiUrl + '/api/cart', {headers})
      .catch((error: any) =>
        Observable.throw(console.log(error) || 'Server error')
      );
  }

  loginUser(body: Object) {
    const bodyString = JSON.stringify(body);
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http
      .post(this.apiUrl + '/api/authenticate', bodyString, {headers})
      .catch(res => {
        // The error callback (second parameter) is called
        return Observable.throw(res.json());
      });
  }

  createProduct(body: FormData) {
    const token = this.getSessionToken();
    const headers = new HttpHeaders().set('Authorization', token.toString());
    headers.delete('Content-type');

    return this.http
      .post(this.apiUrl + '/products/create', body, {headers})
      .catch((error: any) =>
        Observable.throw(console.log(error) || 'Server error')
      );
  }

  verifyEmail(params: String) {
    return this.http
      .get(this.apiUrl + '/api/verify_email?token=' + params.toString())
      .catch(res => {
        // The error callback (second parameter) is called
        return Observable.throw(res.json());
      });
  }

  getCountries() {
    return this.http
      .get('https://restcountries.eu/rest/v2/all')
      .catch((error: any) =>
        Observable.throw(console.log(error) || 'Server error')
      );
  }

  updateProfileInfo(body: Object, token: Object) {
    const bodyString = JSON.stringify(body);
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    headers.append('Authorization', token.toString());


    return this.http
      .patch(this.apiUrl + '/api/update_user', body, {headers})
      .catch(res => {
        // The error callback (second parameter) is called
        return Observable.throw(res.json());
      });
  }
}
