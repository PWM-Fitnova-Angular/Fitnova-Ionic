import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    IonicModule,
    FormsModule
  ]
})
export class HomePage {
  name = '';
  email = '';
  phoneNumber = '';
  birthday = '';

  Registrarse() {
    console.log(this.name, this.email, this.phoneNumber, this.birthday);
  }
}

