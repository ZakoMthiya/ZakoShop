import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  async addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product)
  }

  getQuantity() {
    let quantityToBeReturned = 0;

    if(!this.shoppingCart) {
      return quantityToBeReturned;
    };

    this.shoppingCart.forEach(x => {
      if(x.product.id === this.product.id)
        quantityToBeReturned = x.quantity;
    });

    return quantityToBeReturned;
  }

  removeProductFromCart(id) {
    this.cartService.removeProduct(id);
  }
}

