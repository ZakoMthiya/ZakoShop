import { Injectable } from '@angular/core';
import { User, auth } from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { UserService } from '../user.service';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';
import { AngularFirestoreDocument } from '@angular/fire/firestore/document/document';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  user$: Observable<firebase.User>;
  userData: any;

  constructor(
    public router: Router,
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService: UserService,
    private afs: AngularFirestore) {

    this.user$ = this.afAuth.authState;

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

  }
// Exeriments

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    } as User;
    return userRef.set(userData, {
      merge: true
    })
  }

  // Firebase Google Sign-in
  SigninWithGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(res => {
        this.SetUserData(res.user);
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
      this.router.navigateByUrl('/login', { skipLocationChange: true });
      this.router.navigate(["/"]);
    })
  }

  get appUser$() : Observable<AppUser> {
    return this.user$.pipe(switchMap(user => {
      if(user) return this.userService.getUser(user.uid).valueChanges();
      return of(null);
      }
    ))
  }

}
