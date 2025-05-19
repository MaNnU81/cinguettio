import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-cingue',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './new-cingue.component.html',
  styleUrl: './new-cingue.component.scss'
})
export class NewCingueComponent {
  firebaseServ = inject(FirebaseService);
  router = inject(Router);
  
  nuovoCinguettio = {
    testo: '',
    usaPosizione: false
  };
  isLoading = false;
  errorMessage = '';

  constructor() {
    // Protezione manuale della rotta
    if (!this.firebaseServ.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  async pubblica() {
    if (!this.nuovoCinguettio.testo.trim()) {
      this.errorMessage = 'Il testo non può essere vuoto';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      let location: { lat: number; lng: number } | undefined;
      
      if (this.nuovoCinguettio.usaPosizione) {
        const pos = await this.getLocation();
        location = { lat: pos.lat, lng: pos.lng };
      }

      await this.firebaseServ.addCinguettio(this.nuovoCinguettio.testo, location);
      this.nuovoCinguettio.testo = '';
      this.router.navigate(['/list']); // Torna alla lista dopo la pubblicazione
    } catch (error) {
      console.error('Errore:', error);
      this.errorMessage = 'Errore durante la pubblicazione';
    } finally {
      this.isLoading = false;
    }
  }

  private getLocation(): Promise<{lat: number, lng: number}> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }),
          (error) => reject(error)
        );
      } else {
        reject(new Error('Geolocalizzazione non supportata'));
      }
    });
  }
}
