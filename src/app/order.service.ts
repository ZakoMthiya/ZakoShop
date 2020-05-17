import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFirestore) { }

  storeOrder(order) {
    return this.db.collection('/orders').add(order);
  }

  getAllOrders() {
    return this.db.collection('/orders').valueChanges()
  }

  getAllUserOrders(userId: string) {
    let i = this.db.collection('/orders', query =>  query.where('userId', '==', userId)).valueChanges();
    return i;
  }
}

