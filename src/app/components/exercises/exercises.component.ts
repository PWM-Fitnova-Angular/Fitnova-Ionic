import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent, IonGrid,
  IonHeader, IonIcon, IonItem, IonLabel, IonList,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ExerciseCardComponent} from "../exercise-card/exercise-card.component";
import {Router, RouterLink} from "@angular/router";
import {ExerciseService} from "../../services/exercise.service";
import {SqliteService} from "../../services/sqlite.service";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  imports: [
    IonCol,
    IonRow,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonGrid,
    NgForOf,
    ExerciseCardComponent,
    NgIf,
    NgClass,
    IonButtons,
    IonButton,
    RouterLink,
    IonIcon
  ]
})
export class ExercisesComponent  implements OnInit {


  bodyClass: string = '';
  mainItems: string[] = [];
  sideItems: string[] = [];
  title: string = '';

  sideIcons: string[] = [];

  allItems: any[] = [];
  cardItems: any[] = [];
  topFilterActive: string | null = null;
  sideFilterActive: string | null = null;

  constructor(private router: Router, private exerciseService: ExerciseService, private sqliteService: SqliteService) {}

  ngOnInit() {

    this.loadExercises();

  }

  private async loadExercises() {
    this.title = 'WORKOUTS';
    this.bodyClass = 'exercise-body';
    this.mainItems = ['Favourites','All','Arm exercises', 'Chest exercises', 'Back exercises', 'Leg exercises'];


    this.sideItems = [
      'Cardio exercises',
      'Pulley exercises',
      'Machine exercises',
      'Dumbbell exercises',
      'Body exercises'
    ];
    this.sideIcons = ['fa-running', 'fa-cogs', 'fa-tools', 'fa-dumbbell', 'fa-user'];

    const data = await this.exerciseService.getExercises();
    this.allItems = data;
    this.cardItems = [...data]

  }



  async topFilter(item: string) {
    const parte = item.split(' ')[0];

    if (parte === 'All') {
      this.topFilterActive = null;
      this.cardItems = [...this.allItems];
    } else if (parte === 'Favourites') {
      this.topFilterActive = 'Favourites';
      this.cardItems = await this.sqliteService.getFavourites();
    } else {
      this.topFilterActive = (this.topFilterActive === parte) ? null : parte;
      this.applyFilters();
    }

    this.updateBodyClass();
  }


  sideFilter(item: string) {
    const parte = item.split(' ')[0];
    this.sideFilterActive = (this.sideFilterActive === parte) ? null : parte;
    this.applyFilters();
    this.updateBodyClass();
  }

  private applyFilters() {
    let cardsFiltered = [...this.allItems];

    if (this.topFilterActive) {
      const topFilter = this.topFilterActive;
      cardsFiltered = cardsFiltered.filter(item =>
        item.muscleGroups?.includes(topFilter) ||
        item.categories?.includes(topFilter)
      );
    }

    if (this.sideFilterActive) {
      const sideFilter = this.sideFilterActive;
      cardsFiltered = cardsFiltered.filter(item =>
        item.equipment?.includes(sideFilter) ||
        item.tags?.includes(sideFilter)
      );
    }

    this.cardItems = cardsFiltered;
  }

  isAnyFilterActive(): boolean {
    return this.topFilterActive !== null || this.sideFilterActive !== null;
  }

  private updateBodyClass(): void {
    const baseClass = this.router.url.includes('recipes') ? 'recipes-body' : 'exercise-body';

    if (this.isAnyFilterActive()) {
      this.bodyClass = `${baseClass} filter-active`;
    } else {
      this.bodyClass = baseClass;
    }
  }

}
