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
  // This returns an array of all the items in the cart
  async getCarti() {
    let cartId = await this.getOrCreateCartId();
    console.log('Got the cart Id');
    return this.db.collection('/shopping-carts/' + cartId + '/items/');
  }

}
