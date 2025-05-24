import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonIcon} from "@ionic/angular/standalone";
import {UserService} from "../../services/user.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {RouterLink} from "@angular/router";
import { addIcons } from 'ionicons';
import { camera } from 'ionicons/icons';

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
    IonIcon,
    RouterLink
  ]
})
export class ProfileComponent  implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  userImageUrl: any;
  username: any = "";
  email: any = "";
  gender: any = "";

  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) {
    addIcons({ camera });
  }

  async ngOnInit() {
    const data = await this.userService.getUserInfo();
    this.email = data.email;
    this.username= data.nameSurname;
    this.gender = data.gender;
    console.log(userUid)
    if(userUid){
      this.userImageUrl = this.localStorageService.getProfileImage(userUid);
    }
  }

  openImagePicker() {
    this.fileInput.nativeElement.click();
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/') && userUid) {
      try {
        const dataUrl = await this.localStorageService.saveProfileImage(userUid, file);
        this.userImageUrl = dataUrl;
        console.log('Imagen de perfil actualizada correctamente');
      } catch (error) {
        console.error('Error al guardar la imagen:', error);
      }
    }
  }
}
