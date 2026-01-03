import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Data } from '../data';




@Component({
  selector: 'app-inscription',
  imports: [FormsModule, RouterLink],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription {
  constructor(private data: Data,private router: Router) {}

  formData = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  message = '';
  showPassword = false;
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {

    // detecter si les champ sont vides
    if (
      !this.formData.nom ||
      !this.formData.email ||
      !this.formData.password ||
      !this.formData.confirmPassword
    ) {
      this.message = "Veuillez remplir tous les champs";
      return;
    }

    this.message = '';
    if (this.formData.password !== this.formData.confirmPassword) {
      this.message = "Les mots de passe ne correspondent pas";
      return;
    }

    this.data.register({
      nom: this.formData.nom,
      email: this.formData.email,
      password: this.formData.password
    }).subscribe({
      next: (res) => {
        console.log("Inscription réussie", res);
        this.router.navigate(['/connexion']);
      },
      error: () => {
        this.message = "Erreur à la création du compte";
      }
    });
  }
}
