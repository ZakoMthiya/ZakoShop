import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  shoppingCartItemCount: number;
  cart$ = [];

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCarti();
    cart$.valueChanges().subscribe(cart => this.cart$ = cart)
  }

  getQuantity() {
    let quantityToBeReturned = 0;

    console.log('Get Quantity in nav bar');

    if(!this.cart$) {
      console.log('No cart');
      return quantityToBeReturned;
    };

    console.log('Found cart');

    let newArray = [];
    console.log(newArray + 'Before')
    let item = this.cart$.forEach(x => {
      newArray.push(x);
    });

    // Works up to this point in time

    let secondArray = [];
    // console.log(item);
    let temp = newArray.find(x => {
      console.log('Inside nav temp method')

        console.log(x)
        console.log('ID ' + x.product.id + ' ID');
        // At last!!!
        console.log(x.quantity + ' Quantity');
        quantityToBeReturned += x.quantity;
        console.log(quantityToBeReturned + 'While setting');

    });
    console.log(temp);

    console.log(quantityToBeReturned + 'After setting');

    // console.log(newArray[0].quantity + 'After')
    return quantityToBeReturned;
  }

}
