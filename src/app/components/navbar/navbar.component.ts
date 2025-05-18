import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  firebaseServ = inject(FirebaseService);
  router = inject(Router);
  async logout() {
  await this.firebaseServ.logout();
    this.router.navigate(['/login']);
  }
}
