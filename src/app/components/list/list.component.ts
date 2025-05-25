import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { CommonModule } from '@angular/common';
import { NewCingueComponent } from "../new-cingue/new-cingue.component";
import { MapViewComponent } from '../map-view/map-view.component';

@Component({
  selector: 'app-list',
  imports: [CommonModule, NewCingueComponent, MapViewComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {

  firebaseServ = inject(FirebaseService);
}
