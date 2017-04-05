import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Product } from '../app/model/product';
import {Observable} from 'rxjs/Rx';



// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  private apiUrl = 'https://stage-bkbackend.herokuapp.com'

  getProducts() {
    return this.http.get(this.apiUrl + '/products')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
  }
  signupUser(user: Object) {
    let bodyString = JSON.stringify(user);
    let headers = new Headers({ 'Content-type': 'application/json' });  // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers})

    return this.http.post(this.apiUrl + '/api/signup', user, options )
        .map((res: Response) => {

          console.log(res);
          console.log(bodyString);
          return res.json();
        })
        .catch((error:any) => Observable.throw(error.json() || 'Server error'))
  }

  loginUser(body: Object) {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({ 'Content-type': 'application/json' });  // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers})

    return this.http.post(this.apiUrl + '/api/authenticate', bodyString, options )
        .map((res: Response) => {
          console.log(res);
          return res.json();
        })

        .catch((error:any) => Observable.throw(error.json() || 'Server error'))
      }
}
