import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  email: string = '';
  password: string = '';
  error: string = '';
  nick: string = '';

  constructor(
    private firebaseServ: FirebaseService,
    private router: Router
  ) {}

  async register() {
    this.error = '';
    try {
      await this.firebaseServ.register(this.email, this.password, this.nick);
      this.router.navigate(['/list']); // Redirect alla lista dopo il login
    } catch (err) {
      this.error = 'Credenziali non valide';
      console.error(err);
    }
  }

}
