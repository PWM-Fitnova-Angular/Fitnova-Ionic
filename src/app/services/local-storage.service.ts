import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  async saveProfileImage(userId: string, file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const dataUrl = event.target.result as string;
          localStorage.setItem(`profile_image_${userId}`, dataUrl);
          resolve(dataUrl);
        } else {
          reject(new Error('Error al leer el archivo'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Error al procesar el archivo'));
      };

      reader.readAsDataURL(file);
    });
  }

  getProfileImage(userId: string): string | null {
    return localStorage.getItem(`profile_image_${userId}`);
  }

  removeProfileImage(userId: string): void {
    localStorage.removeItem(`profile_image_${userId}`);
  }
}
