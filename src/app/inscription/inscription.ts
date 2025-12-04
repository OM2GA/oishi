import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule, RouterLink],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription {
  formData = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    console.log('Données du formulaire:', this.formData);
    // Ici vous pouvez ajouter la logique d'inscription (appel API, etc.)
  }
}
