import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { AuthService } from '../shared/auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {

  shoppingCartItemCount: number;
  cart$: any[];
  appUser: AppUser;
  user;

  constructor(private cartService: ShoppingCartService,
    public auth: AuthService) {
      this.auth.appUser$.subscribe(user => this.appUser = user);
      this.auth.user$.subscribe(user => this.user = user);
      console.log(this.user);
  }

  async ngOnInit() {
    let cart$ = await this.cartService.getCart();
    cart$.valueChanges().subscribe(cart => this.cart$ = cart);
    // this.user = this.auth.getUser();

  }

  logOut() {
    this.auth.SignOut();
  }

  async ngOnDestroy() {
    console.log('destroyed');
    await this.cartService.deleteCart();
  }

  getQuantity() {
    let quantityToBeReturned = 0;

    if (!this.cart$) {
      console.log('No cart');
      return quantityToBeReturned;
    };

    this.cart$.forEach(x => {
      quantityToBeReturned += x.quantity;
    });

        //  this.user = localStorage.getItem('user');
      // console.log(this.user.email);
    return quantityToBeReturned;
  }

}
