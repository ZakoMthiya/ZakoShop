import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZakoShop';
  description = 'Testing Angular with Firebase';

constructor(private auth: AuthService) {

}

logOut() {
  this.auth.SignOut();
}

}
