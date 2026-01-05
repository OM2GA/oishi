import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Data } from '../../service/data';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule, RouterLink],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})
export class Connexion {
  formData = {
    email: '',
    password: ''
  };

  constructor(private data: Data, private router: Router, private cd: ChangeDetectorRef) { }

  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  message = '';

  onSubmit(): void {

    this.message = '';

    this.data.login({
      email: this.formData.email,
      password: this.formData.password
    }).subscribe({
      next: (res: any) => {
        console.log('Connexion réussie', res);
        localStorage.setItem('user_nom', res.nom);
        localStorage.setItem('user_prenom', res.prenom);
        localStorage.setItem('user_id', res.id);
        localStorage.setItem('user_token', res.token);

        if (res.id_commande) {
          localStorage.setItem('id_commande', res.id_commande);
          console.log('Commande en cours récupérée :', res.id_commande);
        } else {
          localStorage.removeItem('id_commande');
        }
        this.router.navigate(['/liste-box']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.message = "Erreur identifiant ou mot de passe incorrect";
        } else {
          this.message = "Erreur serveur";
        }
        this.cd.detectChanges();
      }
    });
  }
}