import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping = {};
  cart$;
  idArray: string[] = [];
  subscription: Subscription;

  constructor(private cartService: ShoppingCartService,
    private orderService: OrderService,
    private router: Router) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCarti();
    this.subscription = cart$.valueChanges().subscribe(cart => this.cart$ = cart);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getQuantity() {

    let quantityToBeReturned = 0;

    if (!this.cart$) {
      console.log('No cart');
      return quantityToBeReturned;
    }
    else
      this.cart$.forEach(x => {
        quantityToBeReturned += x.quantity;
        console.log('Adding one product from the cart')

      });

    return quantityToBeReturned;
  }

  getTotalPrice() {
    let p = 0;
    this.cart$.forEach(x => {
      p += (x.quantity * x.product.price);
    })
    console.log('After price')
    return p;
  }

  placeOrder() {
    console.log(this.shipping);
    this.cart$.forEach(x => {
      this.idArray.push(x.product.id)

    })
    // let tempItems = [];
    // this.cart$.forEach(x => {
    //   let item = {
    //     product: {
    //       title:
    //     },
    //   };
    // })

    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart$
    }
    console.log(order);
    this.orderService.storeOrder(order);
    this.cartService.clearCart(this.idArray);
    // this.router.navigate(['/order-success']);
  }

}
