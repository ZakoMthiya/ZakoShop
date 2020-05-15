import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../shared/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;

  constructor(private ordersService: OrderService,
    private auth: AuthService) {

    this.orders$ = this.auth.user$.pipe(switchMap(u => {
      return this.ordersService.getAllUserOrders(u.uid)
    }));
  }
  ngOnInit() {
  }

}
