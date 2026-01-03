import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../data';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-liste-box',
  imports: [CommonModule, Footer, Header, RouterModule],
  templateUrl: './liste-box.html',
  styleUrl: './liste-box.css',
})
export class ListeBox implements OnInit {
  boxes$: Observable<any> | undefined;
  prenom_utilisateur: string | null = '';

  constructor(private data: Data) { }

  ngOnInit(): void {
    this.boxes$ = this.data.getBoxesAPI();
    //regler erreur localStorage
    if (typeof window !== 'undefined') {
      this.prenom_utilisateur = localStorage.getItem('user_prenom');
    }
  }

  addPanier(idBox: number): void {
    const idClient = localStorage.getItem('user_id');

    if (!idClient) {
      alert('Utilisateur non connecté');
      return;
    }

    this.data.addToPanier(idBox).subscribe({
      next: (res: any) => {
        if (res.id_commande) {
          localStorage.setItem('id_commande', res.id_commande);
        }
        console.log('Ajout de la box réussie');
      },
      error: (err) => {
        console.error('Erreur ajout panier', err);
      }
    });
  }
}