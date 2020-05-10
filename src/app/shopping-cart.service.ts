import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShoppingCart } from './models/shopping-cart';
import { async } from '@angular/core/testing';
import { Product } from './models/product';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private dbPath = '/shopping-carts';

  cartRef: AngularFirestoreCollection<ShoppingCart> = null;

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
    if(cartId) return cartId;

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
      if(item.exists) {
        let quantity = item.get('quantity');
        item.ref.update({ quantity: quantity + 1});
        console.log(quantity);
        console.log(item$);
      }
      else {
        item.ref.set({ product: product, quantity: 1})
        console.log('Tried setting');
        console.log(item)
      }
    })
  }
}
