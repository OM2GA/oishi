import { Routes } from '@angular/router';
import { Inscription } from './inscription/inscription';
import { Statistiques } from './statistiques/statistiques';
import { ListeBox } from './liste-box/liste-box';

export const routes: Routes = [
    { path: '', redirectTo: '/inscription', pathMatch: 'full' }, 
    { path: 'inscription', component: Inscription },
    { path: 'statistiques', component: Statistiques },
    { path: 'liste-box', component: ListeBox },
];
