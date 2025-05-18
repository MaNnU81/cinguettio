import { Component } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 

email: string = '';
  password: string = '';
  error: string = '';

  constructor(
    private firebaseServ: FirebaseService,
    private router: Router
  ) {}

  async login() {
    this.error = '';
    try {
      await this.firebaseServ.login(this.email, this.password);
      this.router.navigate(['/list']); // Redirect alla lista dopo il login
    } catch (err) {
      this.error = 'Credenziali non valide';
      console.error(err);
    }
  }
}