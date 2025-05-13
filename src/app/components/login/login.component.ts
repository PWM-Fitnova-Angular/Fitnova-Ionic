import { Component } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";

@Component({
  standalone:true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonInput, IonButton,
    FormsModule, RouterLink, IonCardHeader, IonCard, IonCardTitle, IonCardContent,

  ]
})
export class LoginComponent  {
  email: string = '';
  password: string = '';

  constructor() { }


  login() {

  }
}
