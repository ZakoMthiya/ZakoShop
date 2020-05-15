import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { AuthService } from '../shared/auth.service';
import { AppUser } from '../models/app-user';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  shoppingCartItemCount: number;
  cart$;
  appUser: AppUser;
  user: AppUser;

  constructor(private cartService: ShoppingCartService,
    public auth: AuthService) {
      this.auth.appUser$.subscribe(user => this.user = this.appUser = user);

      console.log('constructor ran');
  }

  async ngOnInit() {
    let cart$ = await this.cartService.getCarti();
    cart$.valueChanges().subscribe(cart => this.cart$ = cart)

    console.log('init ran');
    console.log(this.appUser);


  }

  logOut() {
    this.auth.SignOut();
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
