import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$: any[] = [];
  idArray: string[] = [];
  price;

  constructor(private cartService: ShoppingCartService,
    private afAuth: AngularFireAuth) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCarti();
    if (cart$)
      cart$.valueChanges().subscribe(cart => this.cart$ = cart);
  }


  getQuantity() {

    let quantityToBeReturned = 0;
    let iA = [];

    if (!this.cart$) {
      console.log('No cart');
      return quantityToBeReturned;
    }

    this.cart$.forEach(x => {
      quantityToBeReturned += x.quantity;
      iA.push(x);
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
    console.log('About to clear cart')
    // console.log(this.idArray)
    this.cartService.clearCart(this.idArray);
  }
}
