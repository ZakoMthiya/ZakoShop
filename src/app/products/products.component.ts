import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscribtion: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: ShoppingCartService) {

    this.productService.getProducts().snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          let data = a.payload.doc.data() as Product;
          let id = a.payload.doc.id;
          // console.log(data);
          // console.log(id);
          return { id, ...data };
        });
      })).subscribe(products => this.filteredProducts = this.products = products);

    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      if(this.category) {
        this.filteredProducts = this.products.filter(p => p.category === this.category)
      }
      else
      this.filteredProducts = this.products
      // this.filteredProducts = (this.category) ?
      //   this.products.filter(p => p.category === this.category) :
      //   this.products;
    });
  }

  async ngOnInit() {
    console.log('About to get cart');
    this.subscribtion = (await (this.cartService.getCarti()))
      .valueChanges().subscribe(cart => this.cart = cart);
    console.log(this.cart);
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

}
