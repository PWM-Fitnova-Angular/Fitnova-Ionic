import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonAvatar } from '@ionic/angular/standalone';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  standalone: true,
  selector: 'app-profile-image',
  template: `
    <ion-avatar>
      <img [src]="imageUrl || defaultImageUrl" alt="Imagen de perfil">
    </ion-avatar>
  `,
  styles: [`
    ion-avatar {
      width: 80px;
      height: 80px;
      margin: 0 auto;
    }
  `],
  imports: [CommonModule, IonAvatar]
})
export class ProfileImageComponent implements OnInit {
  @Input() userId: string = '';

  imageUrl: string | null = null;
  defaultImageUrl: string = 'assets/icon/favicon.png';

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    this.loadProfileImage();
  }

  loadProfileImage() {
    if (this.userId) {
      this.imageUrl = this.localStorageService.getProfileImage(this.userId);
    }
  }
}
