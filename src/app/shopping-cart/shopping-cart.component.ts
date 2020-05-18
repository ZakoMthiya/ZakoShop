import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$: any[] = [];
  idArray: string[] = [];
  price: any;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    if (cart$)
      cart$.valueChanges().subscribe(cart => this.cart$ = cart);
  }


  getQuantity() {
    return this.cartService.getItemCount(this.cart$);
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice(this.cart$);
  }

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product) {
    this.cartService.removeFromCart(product)
  }

  clearCart() {
    this.cart$.forEach(x => {
      this.idArray.push(x.product.id)
    });
    this.cartService.clearCart(this.idArray);
  }

  removeProductFromCart(id) {
    this.cartService.removeProduct(id);
  }
}
//
