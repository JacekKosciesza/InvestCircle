import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { IdentityService } from './identity.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private identityService: IdentityService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.identityService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { redirect: state.url } });
    return false;
  }
}
