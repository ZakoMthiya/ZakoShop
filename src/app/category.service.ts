import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category } from './models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private dbPath = '/categories';

  categoriesRef: AngularFirestoreCollection<Category> = null;

  constructor(private db: AngularFirestore) {
    this.categoriesRef = db.collection(this.dbPath);
  }

  getCategories(): AngularFirestoreCollection<Category> {
    return this.categoriesRef;
  }
}
