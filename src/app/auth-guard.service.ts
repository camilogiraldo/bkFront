import { Injectable }     from '@angular/core';
import { Router, CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import { ApiService } from './api.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private api: ApiService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.api.isLoggedIn()){
      this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}});
      return false;
    }
    return true;
  }
}
