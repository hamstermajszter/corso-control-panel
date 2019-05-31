import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {
    return this.afAuth.authState
    .pipe(
      take(1),
      map(user => !!user),
      tap(authenticated => {
        if (!authenticated) {
            this.router.navigate(['admin', 'sign-in']);
        }
      })
    )
  }
}
