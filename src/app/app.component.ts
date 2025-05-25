import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from './services/firebase/firebase.service';
import { NavbarComponent } from "./components/navbar/navbar.component";





@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cinguettio';

  firebaseServ = inject(FirebaseService);

  constructor ()
{
this.firebaseServ.init()
this.firebaseServ.getAllCinguettii();
}

}
