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

  constructor(private cartService: ShoppingCartService,
    public auth: AuthService) {
      this.auth.appUser$.subscribe(user => this.appUser = user);
  }

  async ngOnInit() {
    let cart$ = await this.cartService.getCarti();
    cart$.valueChanges().subscribe(cart => this.cart$ = cart);
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

    return quantityToBeReturned;
  }

}
