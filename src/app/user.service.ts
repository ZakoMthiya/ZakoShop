import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  saveUser(user: firebase.User) {
    let u = this.db.collection('/users').doc(user.uid);
    if(!u) {
      u.set({
        name: user.displayName,
        email: user.email
      })
    }

  }

  getUser(uid: string) : AngularFirestoreDocument<AppUser> {
    return this.db.collection('/users').doc(uid);
  }
}
