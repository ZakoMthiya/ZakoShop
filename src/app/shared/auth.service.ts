import { Injectable, NgZone } from '@angular/core';
import { User, auth } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { UserService } from '../user.service';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  user$: Observable<firebase.User>;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService) {

    this.user$ = this.afAuth.authState;

  }


  // Firebase Google Sign-in
  SigninWithGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(res => {
        console.log('Successfully logged in!');
        this.userService.saveUser(res.user);
        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl);

      }).catch(error => {
        console.log(error)
      });
  }

  // Firebase Logout
  SignOut() {
    return this.afAuth.signOut().then(() => {
      console.log('Signed out');
      this.router.navigateByUrl('/login', { skipLocationChange: true });
      this.router.navigate(["/"]);
    })
  }

  get appUser$() : Observable<AppUser> {
    return this.user$.pipe(switchMap(user => {
      if(user) return this.userService.getUser(user.uid).valueChanges();
      console.log(user);
      return of(null);
      }
    ))
  }

}
