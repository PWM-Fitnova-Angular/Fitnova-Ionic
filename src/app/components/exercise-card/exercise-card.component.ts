import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonChip,
  IonIcon,
  IonButton,
  IonSpinner,
  IonLabel,
  ModalController
} from '@ionic/angular/standalone';
import { NgClass, NgIf, NgForOf } from '@angular/common';
import { Router } from '@angular/router';
import { DetailsWorkoutRecipeComponent } from '../details-workout-recipe/details-workout-recipe.component';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonChip,
    IonIcon,
    IonButton,
    IonSpinner,
    IonLabel,
    NgClass,
    NgIf,
    NgForOf
  ]
})
export class ExerciseCardComponent {
  @Input() cardLabel = 'Strength';
  @Input() cardTitle  = 'Test';
  @Input() cardImage  = '/assets/img/bench_press.jpg';
  @Input() cardObject!: {
    description: string;
    requirements: string[];
    imageUrl: string;
  };

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;
  imagePreview = this.cardImage;
  isUploading   = false;
  isEditMode    = false;

  constructor(
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.[0]) return;
    this.selectedFile = input.files[0];
    if (!this.selectedFile.type.startsWith('image/')) {
      alert('Por favor, selecciona un archivo de imagen válido.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => this.imagePreview = reader.result as string;
    reader.readAsDataURL(this.selectedFile);
  }

  uploadImage(event: Event): void {
    event.preventDefault(); event.stopPropagation();
    if (!this.selectedFile) return;
    this.isUploading = true;
    setTimeout(() => {
      console.log('Imagen subida correctamente:', this.selectedFile?.name);
      this.isUploading = false;
      this.isEditMode = false;
    }, 1500);
  }

  cancelEdit(event: Event): void {
    event.preventDefault(); event.stopPropagation();
    this.resetImage();
    this.isEditMode = false;
  }

  resetImage(): void {
    this.imagePreview = this.cardImage;
    this.selectedFile = null;
    this.fileInput.nativeElement.value = '';
  }

  async openDetails(event: Event) {
    event.stopPropagation();
    const modal = await this.modalCtrl.create({
      component: DetailsWorkoutRecipeComponent,
      componentProps: { cardObject: this.cardObject }
    });
    await modal.present();
  }

  showDetails(cardObject: any) {
    this.router.navigate(['/details'], { state: { cardObject } });
  }
}
