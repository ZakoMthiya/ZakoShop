import { Injectable, NgZone } from '@angular/core';
import { User, auth } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    private angularFireAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    })
  }


  // Firebase Google Sign-in
  SigninWithGoogle() {
    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(res => {
        console.log('Successfully logged in!')

      }).catch(error => {
        console.log(error)
      });
  }

  // Firebase Logout
  SignOut() {
    return this.afAuth.signOut().then(() => {
      console.log('Signed out');
      this.router.navigate(['dashboard']);
    })
  }

}
