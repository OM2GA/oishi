import { Routes } from '@angular/router';
import { Inscription } from './inscription/inscription';

export const routes: Routes = [
    { path: 'inscription', component: Inscription },
    { path: '', redirectTo: '/inscription', pathMatch: 'full' }
];
