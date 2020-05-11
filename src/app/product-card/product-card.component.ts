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

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    // this.cartService.getDoc(product);

  }

  getQuantity() {
    let quantityToBeReturned = 0;

    console.log('Get Quantity method');
    console.log(this.shoppingCart);

    if(!this.shoppingCart) {
      console.log('No cart');
      return quantityToBeReturned;
    };

    console.log('Found cart');

    let newArray = [];
    console.log(newArray + 'Before')
    let item = this.shoppingCart.forEach(x => {
      newArray.push(x);
    });

    // Works up to this point in time

    let secondArray = [];
    console.log(item);
    let temp = newArray.find(x => {
      console.log('Inside temp method')
      if(x.product.id === this.product.id) {
        console.log(x)
        console.log('ID ' + x.product.id + ' ID');
        // At last!!!
        console.log(x.quantity + ' Quantity');
        quantityToBeReturned = x.quantity;
        console.log(quantityToBeReturned + 'While setting');

      }
      else console.log('Didnt match');
    });
    console.log(temp);

    console.log(quantityToBeReturned + 'After setting');

    // console.log(newArray[0].quantity + 'After')
    return quantityToBeReturned;
  }
}
// This works
// console.log('Found cart');
//     let item = this.shoppingCart.forEach(x => {
//       x.find(i => console.log(i))
//     });

//
// x.key === this.product.id;
