import { Injectable }     from '@angular/core';
import { Router, CanActivate} from '@angular/router';

import { ApiService } from './api.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private api: ApiService, private router: Router) { }

  canActivate() {
    if (!this.api.isLoggedIn()){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
