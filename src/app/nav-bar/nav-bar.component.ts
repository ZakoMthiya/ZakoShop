import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  shoppingCartItemCount: number;
  cart$;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    let cart$ = this.cartService.getCarti();
    cart$.valueChanges().subscribe(cart => this.cart$ = cart)
  }

  getQuantity() {
    let quantityToBeReturned = 0;

    if(!this.cart$) {
      console.log('No cart');
      return quantityToBeReturned;
    };

    this.cart$.forEach(x => {
      quantityToBeReturned += x.quantity;
    });

    return quantityToBeReturned;
  }

}
