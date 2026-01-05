import { Component, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('oishi');

  constructor(private router: Router) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {

      if (typeof localStorage !== 'undefined') {
        const userId = localStorage.getItem('user_id');
        const urlActuelle = event.urlAfterRedirects;

        const pagesPubliques = ['/connexion', '/inscription', '/rgpd', '/'];

        if (!userId && !pagesPubliques.includes(urlActuelle)) {

          console.log("Accès refusé : redirection vers inscription");
          this.router.navigate(['/inscription']);
        }
      }
    });
  }
}