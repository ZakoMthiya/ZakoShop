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
    let cart$ = await this.cartService.getCarti();
    if (cart$)
      cart$.valueChanges().subscribe(cart => this.cart$ = cart);
  }


  getQuantity() {
    let quantityToBeReturned = 0;

    if (!this.cart$) {
      return quantityToBeReturned;
    }

    this.cart$.forEach(x => {
      quantityToBeReturned += x.quantity;
      this.idArray.push(x.product.id)
    });

    return quantityToBeReturned;
  }

  getTotalPrice() {
    let p = 0;
    this.cart$.forEach(x => {
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
    this.cartService.clearCart(this.idArray);
  }

  removeProductFromCart(id) {
    this.cartService.removeProduct(id);
  }
}
