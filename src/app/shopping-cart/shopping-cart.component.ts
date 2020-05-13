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
  idArray: string[] = [];
  price;

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
      this.idArray.push(x.product.id)
    });

    this.itemsArray = iA;

    return quantityToBeReturned;
  }

  getTotalPrice() {
    let p = 0;
    this.itemsArray.forEach(x => {
      p += (x.quantity * x.product.price);
    })
    return p;
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product) {
    this.cartService.removeFromCart(product)
  }

  clearCart() {
    console.log('About to clear cart')
    // console.log(this.idArray)
    this.cartService.clearCart(this.idArray);
  }

  removeProductFromCart(id) {
    console.log('About to remove product')
    // console.log(this.idArray)
    this.cartService.removeProduct(id);
  }

}
