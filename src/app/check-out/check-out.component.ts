import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {

  shipping = {};
  cart$;
  userId: string;
  idArray: string[] = [];
  cartSubscription: Subscription;
  userSubscription: Subscription;

  constructor(private cartService: ShoppingCartService,
    private orderService: OrderService,
    private auth: AuthService,
    private router: Router) { }

  async ngOnInit() {
    let cart$ = await this.cartService.getCarti();
    this.cartSubscription = cart$.valueChanges().subscribe(cart => this.cart$ = cart);

    this.userSubscription = this.auth.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
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

    let order = {
      userId: this.userId,
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart$
    }
    console.log(order);
    this.orderService.storeOrder(order);
    this.cartService.clearCart(this.idArray);
    this.router.navigate(['/order-success']);
  }

}
