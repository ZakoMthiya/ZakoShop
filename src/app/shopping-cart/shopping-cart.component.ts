import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;
  idArray: string[];
  itemsArray: any[];
  oneItem;

  constructor(private cartService: ShoppingCartService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    let cart$ = this.cartService.getCarti();
    cart$.valueChanges().subscribe(cart => this.cart$ = cart);
  }


  getQuantity() {
    let quantityToBeReturned = 0;
    let iA = [];
    let idA: string[] = [];

    if(!this.cart$) {
      console.log('No cart');
      return quantityToBeReturned;
    };

    this.cart$.forEach(x => {

      quantityToBeReturned += x.quantity;
      iA.push(x.product);
      idA.push(x.product.id);


    });

    // console.log(idA);
    // console.log(iA);

    // let tt;
    // iA.forEach(a => {
    //   if(a.id === idA[0]) tt = a
    //   console.log(a.id === idA[0])
    //   console.log(idA[0])
    // })
    // console.log('TT ' + tt.id);

    this.idArray = idA;
    this.itemsArray = iA;
    // console.log(this.idArray);
    // console.log(this.itemsArray)

    return quantityToBeReturned;
  }

}
