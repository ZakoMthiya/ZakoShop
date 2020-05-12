import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$;
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

    if(!this.cart$) {
      console.log('No cart');
      return quantityToBeReturned;
    };

    this.cart$.forEach(x => {
      quantityToBeReturned += x.quantity;
      iA.push(x);
    });

    this.itemsArray = iA;

    return quantityToBeReturned;
  }

}
