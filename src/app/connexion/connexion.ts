import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Data } from '../data';

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
  constructor(private data: Data,private router: Router) {}
  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
  this.data.login({
    email: this.formData.email,
    password: this.formData.password
  }).subscribe({
    next: (res: any) => {
      if (res.error) {
        alert(res.error);
        return;
      }
      console.log('Connexion réussie', res);
      localStorage.setItem('user_nom', res.nom);
      this.router.navigate(['/liste-box']);
    },
    error: (err) => {
      if (err.error?.error) {
        alert(err.error.error);
      } else {
        alert('Erreur serveur');
      }
    }
  });
}
}
