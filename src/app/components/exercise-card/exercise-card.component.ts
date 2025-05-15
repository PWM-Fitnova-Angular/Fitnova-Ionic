import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {IonButton, IonCard, IonCardContent, IonChip, IonIcon, IonLabel, IonSpinner} from "@ionic/angular/standalone";
import {Router} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonChip,
    IonIcon,
    IonButton,
    IonSpinner,
    IonLabel,
    NgClass,
    NgIf
  ]
})
export class ExerciseCardComponent {

  selectedFile: File | null = null;
  imagePreview: string = '/app/assets/img/bench_press.jpg';
  isUploading: boolean = false;
  isEditMode: boolean = false;

  @Input() cardLabel: string = 'Strength';
  @Input() cardTitle: string = 'Test';
  @Input() cardImage: string = 'Test';
  @Input() cardObject: any;



  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      if (!this.selectedFile.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen válido.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };

      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.selectedFile) {
      console.error('No hay imagen seleccionada');
      return;
    }

    this.isUploading = true;

    // Simulación de carga
    setTimeout(() => {
      console.log('Imagen subida correctamente:', this.selectedFile?.name);
      this.isUploading = false;
      this.isEditMode = false;
    }, 1500);

  }

  cancelEdit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.resetImage();
    this.isEditMode = false;
  }

  resetImage(): void {
    this.imagePreview = '/app/assets/img/DefaultImage.png';
    this.selectedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  showDetails(cardObject: any) {
    this.router.navigate(['/details'],{
      state: {cardObject}
    });
  }

}
