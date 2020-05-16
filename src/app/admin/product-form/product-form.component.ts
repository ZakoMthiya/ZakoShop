import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { map, take } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {} as Product;
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {

    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.getProduct(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p as Product);

    this.categories$ = categoryService.getCategories().snapshotChanges()
    .pipe(map(actions => {
      return actions.map(a => {
        let data = a.payload.doc.data() as Category;
        let id = a.payload.doc.id;
        // console.log(data);
        // console.log(id);
        return {id, ...data};
      });
    }));
  }

  ngOnInit() {
  }

  save(product) {
    // console.log(product);

    if(this.id) this.productService.updateProduct(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products'])
  }

  delete() {
    if(!confirm('Are you sure you want this product deleted?')) return;

    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }
}
