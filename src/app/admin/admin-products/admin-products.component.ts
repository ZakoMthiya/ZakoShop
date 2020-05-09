import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/models/product';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products$;

  constructor(private productService: ProductService) {
    this.products$ = productService.getProducts().snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        let data = a.payload.doc.data() as Product;
        let id = a.payload.doc.id;
        // console.log(data);
        // console.log(id);
        return {id, ...data};
      });
    }));
  }

  ngOnInit() {
  }

}
