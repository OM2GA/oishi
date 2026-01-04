import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  imports: [RouterModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(private router: Router, private http: HttpClient) { }
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_nom');
      localStorage.removeItem('user_prenom');
      localStorage.removeItem('user_id');
      localStorage.removeItem('id_commande');
      localStorage.removeItem('user_token');
    }
    console.log('Déconnexion réussie');
    this.router.navigate(['/connexion']);
  }
}
