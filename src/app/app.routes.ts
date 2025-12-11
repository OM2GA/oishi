import { Routes } from '@angular/router';
import { Inscription } from './inscription/inscription';
import { Statistiques } from './statistiques/statistiques';
import { ListeBox } from './liste-box/liste-box';

import { Connexion } from './connexion/connexion';

export const routes: Routes = [
    { path: '', redirectTo: '/inscription', pathMatch: 'full' },
    { path: 'inscription', component: Inscription },
    { path: 'connexion', component: Connexion },
    { path: 'statistiques', component: Statistiques },
    { path: 'liste-box', component: ListeBox },
];
