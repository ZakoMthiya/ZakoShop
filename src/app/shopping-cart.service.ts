import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShoppingCart } from './models/shopping-cart';
import { async } from '@angular/core/testing';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private dbPath = '/shopping-carts';

  cartRef = null;

  constructor(private db: AngularFirestore) {
    this.cartRef = db.collection(this.dbPath);
  }

  private createCart() {
    return this.cartRef.add({
      dateCreated: new Date().getTime()
    })
  }

  private getCart(cartId: string) {
    return this.cartRef + '/' + cartId;
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.createCart();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  async addToCart(product: Product) {

    console.log(product.id);
    let cartId = await this.getOrCreateCartId();
    console.log(cartId);

    let item$ = this.db.doc('shopping-carts/' + cartId + '/items/' + product.id).get()
    console.log(item$);

    item$.pipe(take(1)).subscribe(item => {
      if (item.exists) {
        let quantity = item.get('quantity');
        item.ref.set({ product: product, quantity: quantity + 1 });
        console.log(quantity);
        console.log(item$);
      }
      else {
        item.ref.set({ product: product, quantity: 1 })
        console.log('Tried setting');
        console.log(item)
      }
    })
  }

  async removeFromCart(product: Product) {

    console.log(product.id);
    let cartId = await this.getOrCreateCartId();
    console.log(cartId);

    let item$ = this.db.doc('shopping-carts/' + cartId + '/items/' + product.id).get()
    console.log(item$);

    item$.pipe(take(1)).subscribe(item => {
      if (item.exists) {
        let quantity = item.get('quantity');
        item.ref.set({ product: product, quantity: quantity - 1 });
        console.log(quantity);
        console.log(item$);
      }
      else {
        console.log('This will never get triggered');
      }
    })
  }

  // Experiments

  getCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
  }

  // This returns an array of all the items in the cart
  async getCarti() {
    let cartId = this.getCartId();
    if(!cartId) {
      console.log('Failed to get cartId in service')
    }
    console.log('Got the cart Id in service');
    return this.db.collection('/shopping-carts/' + cartId + '/items/');
  }

  clearCart(id: string[]) {
    let cartId = this.getCartId();
    let cart = this.db.collection('/shopping-carts/' + cartId  + '/items/');
    // Works
    //cart.doc('4edDXZtdJrtWqhTPQ9VS').delete()
    //console.log('Attempt')
    // let ic = ['4edDXZtdJrtWqhTPQ9VS', '5tFTj2TlIMqKNHKLTk1U']
    id.forEach(x => {
      cart.doc(x).delete();
    });
    this.db.collection('/shopping-carts').doc(cartId).delete();
  }

  removeProduct(id: string) {
    let cartId = this.getCartId();
    let cart = this.db.collection('/shopping-carts/' + cartId  + '/items/');

    cart.doc(id).delete();
  }
}

// Seems to be working ovetime. Always deleting

// cart.ref.onSnapshot(x => {
//   console.log(x)
//   x.docs.forEach(i => {
//     i.ref.delete();
//   })
// })
