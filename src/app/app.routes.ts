import { Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { NewCingueComponent } from './components/new-cingue/new-cingue.component';



export const routes: Routes = [
    {path: "list", component: ListComponent},
    {path: "login", component: LoginComponent},
    {path: "new-cingue", component: NewCingueComponent },
    {path: "**", redirectTo: "/list", pathMatch: "full"}

];
