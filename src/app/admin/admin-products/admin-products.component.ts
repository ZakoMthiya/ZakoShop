import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getProducts().snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        let data = a.payload.doc.data() as Product;
        let id = a.payload.doc.id;
        // console.log(data);
        // console.log(id);
        return {id, ...data};
      });
    })).subscribe(products => this.filteredProducts = this.products = products);
  }

  ngOnInit() {
  }

  filter(query: string) {
    console.log(query);
    this.filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
