import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-list',
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  firebaseServ = inject(FirebaseService);
}
