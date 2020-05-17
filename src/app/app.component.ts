import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZakoShop';

constructor(private auth: AuthService) {

}

logOut() {
  this.auth.SignOut();
}

}
