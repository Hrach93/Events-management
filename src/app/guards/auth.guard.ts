import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  private publicRoutes: string[] = ['auth'];

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.auth.isAuthenticated()) {
        if (!route.url[0]) {
          return true;
        }
        return this.router.navigate(['']);
      } else {
        if (!route.url[0] || route.url[0] && !route.url[0].path) {
          return this.router.navigate(['/auth', 'login']);
        }
        return true;
      }
  }
}
