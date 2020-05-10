import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService) {
    this.productService.getProducts().snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          let data = a.payload.doc.data() as Product;
          let id = a.payload.doc.id;
          // console.log(data);
          // console.log(id);
          return { id, ...data };
        });
      })).subscribe(products => this.products = products);

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
  });
}

ngOnInit() {
}

}
