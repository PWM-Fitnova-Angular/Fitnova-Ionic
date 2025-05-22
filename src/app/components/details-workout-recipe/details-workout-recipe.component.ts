import { Component, Input } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  ModalController
} from '@ionic/angular/standalone';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-details-workout-recipe',
  templateUrl: './details-workout-recipe.component.html',
  styleUrls: ['./details-workout-recipe.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    NgForOf
  ]
})
export class DetailsWorkoutRecipeComponent {
  @Input() cardObject!: {
    description: string;
    requirements: string[];
    imageUrl: string;
  };

  constructor(private modalCtrl: ModalController) {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
