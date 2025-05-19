import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { Router, RouterLink } from "@angular/router";
import { NgIf } from "@angular/common";
import { registerUser, saveUserProfile } from "../../firebase/firebase_auth_utils";
import { updateProfile } from "firebase/auth";
import { LocalStorageService } from "../../services/local-storage.service";

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    FormsModule, RouterLink, IonCardHeader, IonCard, IonCardTitle,
    NgIf, ReactiveFormsModule,
  ]
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  gender: string = '';
  selectedFile: File | null = null;
  registerError: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  async register() {
    this.registerError = '';
    this.successMessage = '';
    this.isLoading = true;

    if (!this.name || !this.email || !this.password || !this.gender) {
      this.registerError = "Por favor complete todos los campos";
      this.isLoading = false;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.registerError = "Las contraseñas no coinciden";
      this.isLoading = false;
      return;
    }

    if (this.password.length < 6) {
      this.registerError = "La contraseña debe tener al menos 6 caracteres";
      this.isLoading = false;
      return;
    }

    try {
      const userCredential = await registerUser(this.email, this.password);

      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: this.name
        });


        let photoURL = '';
        if (this.selectedFile && userCredential.user) {
          try {
            photoURL = await this.localStorageService.saveProfileImage(
              userCredential.user.uid,
              this.selectedFile
            );


            if (photoURL) {

              if (photoURL.length <= 255) {
                await updateProfile(userCredential.user, {
                  photoURL: photoURL
                });
              } else {
                console.warn("La URL de la foto es demasiado larga para Firebase Auth, pero se guardará en el perfil extendido");
              }
            }
          } catch (imageError) {
            console.error("Error al guardar la imagen:", imageError);
          }
        }


        await saveUserProfile(userCredential.user.uid, {
          name: this.name,
          email: this.email,
          gender: this.gender,
          password: this.password,
          photoURL: photoURL || null
        });

        this.successMessage = "Registro exitoso";
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.registerError = "Este correo electrónico ya está registrado";
      } else {
        this.registerError = "Error al registrar: " + error.message;
      }
    } finally {
      this.isLoading = false;
    }
  }
}
