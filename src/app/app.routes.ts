import { Routes } from '@angular/router';
import { Inscription } from './composant/inscription/inscription';
import { Statistiques } from './composant/statistiques/statistiques';
import { ListeBox } from './composant/liste-box/liste-box';
import { HistoriqueCommandes } from './composant/historique-commandes/historique-commandes';
import { Connexion } from './composant/connexion/connexion';
import { Panier } from './composant/panier/panier';
import { Rgpd } from './composant/rgpd/rgpd';

export const routes: Routes = [
    { path: '', redirectTo: '/connexion', pathMatch: 'full' },
    { path: 'inscription', component: Inscription },
    { path: 'connexion', component: Connexion },
    { path: 'statistiques', component: Statistiques },
    { path: 'liste-box', component: ListeBox },
    { path: 'panier', component: Panier },
    { path: 'rgpd', component: Rgpd },
    { path: 'historique-commandes', component: HistoriqueCommandes },

];
