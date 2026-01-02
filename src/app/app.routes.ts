import { Routes } from '@angular/router';
import { Inscription } from './inscription/inscription';
import { Statistiques } from './statistiques/statistiques';
import { ListeBox } from './liste-box/liste-box';

import { Connexion } from './connexion/connexion';
import { Panier } from './panier/panier';

import { Rgpd } from './rgpd/rgpd';

export const routes: Routes = [
    { path: '', redirectTo: '/connexion', pathMatch: 'full' },
    { path: 'inscription', component: Inscription },
    { path: 'connexion', component: Connexion },
    { path: 'statistiques', component: Statistiques },
    { path: 'liste-box', component: ListeBox },
    { path: 'panier', component: Panier },
    { path: 'rgpd', component: Rgpd },
];
