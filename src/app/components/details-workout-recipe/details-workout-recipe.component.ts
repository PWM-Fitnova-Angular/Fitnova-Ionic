import {Component, Input, OnInit} from '@angular/core';
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
import { addIcons } from 'ionicons';
import { close, warningOutline } from 'ionicons/icons';
import {SqliteService} from "../../services/sqlite.service";
import {Router} from "@angular/router";

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
export class DetailsWorkoutRecipeComponent implements OnInit {
  @Input() cardObject!: {
    description: string;
    requirements: string[];
    imageUrl: string;
    name:string;
    id:string;
  };
  isSaved: boolean = false;

  constructor(private modalCtrl: ModalController, private dbService: SqliteService, private router: Router) {
    addIcons({ close, warningOutline });

    const nav = this.router.getCurrentNavigation();
    this.cardObject = nav?.extras?.state?.['cardObject'];
  }

  async ngOnInit() {
    this.isSaved = await this.dbService.isFavourite(this.cardObject.id);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async saveFavourites() {
    console.log(this.isSaved);
    if (this.isSaved) {
      await this.dbService.deleteFavourite(this.cardObject.id);
      console.log("borrado")
      this.isSaved = false;
      await this.router.navigate(['/exercises']);
    } else {
      await this.dbService.saveFavourite(this.cardObject);
      this.isSaved = true;
    }
  }
}
