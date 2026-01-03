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
      const token = localStorage.getItem('user_token');

      if (token) {
        this.http.post('http://localhost:8888/Angular/oishi/api/users/logout.php', { token }).subscribe({
          next: () => console.log('Token invalidé côté serveur'),
          error: (err) => console.error('Erreur lors de la déconnexion API', err)
        });
      }

      localStorage.removeItem('user_nom');
      localStorage.removeItem('user_id');
      localStorage.removeItem('id_commande');
      localStorage.removeItem('user_token');
      console.log('Déconnexion réussie');
    }

    this.router.navigate(['/connexion']);
  }

}
