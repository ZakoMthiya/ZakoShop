import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private dbPath = '/products';

  productsRef: AngularFirestoreCollection<Product> = null;

  constructor(private db: AngularFirestore) {
    this.productsRef = db.collection(this.dbPath);
  }

  getProducts(): AngularFirestoreCollection<Product> {
    return this.productsRef;
  }

  create(product) {
    this.productsRef.add({...product});
  }

  getProduct(productId) {
    return this.productsRef.doc(productId);
  }

  updateProduct(productId, product) {
    return this.productsRef.doc(productId).update(product);
  }

  deleteProduct(productId) {
    return this.productsRef.doc(productId).delete();
  }
}
