import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './models/product';
import { take } from 'rxjs/operators';

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

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.createCart();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  async getItemInCart(id) {
    let cartId = await this.getOrCreateCartId();
    return this.db.doc('shopping-carts/' + cartId + '/items/' + id).get();
  }

  async addToCart(product: Product) {

    let item$ = await this.getItemInCart(product.id);

    item$.pipe(take(1)).subscribe(item => {
      if (item.exists) {
        let quantity = item.get('quantity');
        item.ref.set({ product: product, quantity: quantity + 1 });
      }
      else {
        item.ref.set({ product: product, quantity: 1 })
      }
    })
  }

  async removeFromCart(product: Product) {

    let item$ = await this.getItemInCart(product.id);

    item$.pipe(take(1)).subscribe(item => {
      if (item.exists) {
        let quantity = item.get('quantity');
        item.ref.set({ product: product, quantity: quantity - 1 });
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
    return this.db.collection('/shopping-carts/' + cartId + '/items/');
  }

  async clearCart(id: string[]) {
    let cartId = this.getCartId();
    let cart = await this.getCarti();

    id.forEach(x => {
      cart.doc(x).delete();
    });
    this.db.collection('/shopping-carts').doc(cartId).delete();
    localStorage.removeItem('cartId')
  }
  // removeProduct
  removeProduct(id: string) {
    let cartId = this.getCartId();
    let cart = this.db.collection('/shopping-carts/' + cartId  + '/items/');

    cart.doc(id).delete();
  }

  async deleteCart() {
    let cartId = this.getCartId();
    this.db.collection('/shopping-carts').doc(cartId).delete();
    localStorage.removeItem('cartId');
  }
}
