import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import { Category } from 'src/app/models/category';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('category') category;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getCategories().snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          let data = a.payload.doc.data() as Category;
          let id = a.payload.doc.id;
          // console.log(data);
          // console.log(id);
          return { id, ...data };
        });
      }))
  }

  ngOnInit() {
  }

}
