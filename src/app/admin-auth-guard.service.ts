import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth: AuthService,
    private router: Router,
    private userService: UserService) { }

  canActivate() : Observable<boolean> {
    return this.auth.appUser$
      .pipe(map(appUser => appUser.isAdmin))
  }
}
