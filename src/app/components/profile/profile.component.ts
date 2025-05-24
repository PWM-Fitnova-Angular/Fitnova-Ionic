import { Component, OnInit } from '@angular/core';
import {IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {UserService} from "../../services/user.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {RouterLink} from "@angular/router";

const userUid : string | null = localStorage.getItem('uid');


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    RouterLink
  ]
})
export class ProfileComponent  implements OnInit {
  userImageUrl: any;
  username: any = "";
  email: any = "";
  gender: any = "";


  constructor( private userService: UserService, private localStorageService: LocalStorageService) { }

  async ngOnInit() {

    const data = await this.userService.getUserInfo();
    this.email = data.email;
    this.username= data.nameSurname;
    this.gender = data.gender;
    console.log(userUid)
    if(userUid){this.userImageUrl = this.localStorageService.getProfileImage(userUid);}

  }

}
