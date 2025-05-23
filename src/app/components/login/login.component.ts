import { Component } from '@angular/core';
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
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {loginUser} from "../../firebase/firebase_auth_utils";

@Component({
  standalone:true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    FormsModule, RouterLink, IonCardHeader, IonCard, IonCardTitle, NgIf,

  ]
})
export class LoginComponent  {
  email: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private router: Router) { }


  async login() {


    const response = await loginUser(this.email, this.password);

    if(response){
      localStorage.setItem('uid', response.user.uid);
      await this.router.navigate(['/exercises']);
    }else{
      this.loginError = "Email or password incorrect";
    }

  }
}
