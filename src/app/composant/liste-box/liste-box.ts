import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../../service/data';
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
  message: string = '';


  constructor(private data: Data, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.boxes$ = this.data.getBoxesAPI();
    if (typeof window !== 'undefined') {
      this.prenom_utilisateur = localStorage.getItem('user_prenom');
    }
  }

  addPanier(idBox: number): void {
    this.message = '';
    const idClient = localStorage.getItem('user_id');

    if (!idClient) {
      alert('Utilisateur non connecté');
      return;
    }

    this.data.getPanier().subscribe({
      next: (panierRes: any) => {
        let totalArticles = 0;
        if (panierRes && panierRes.panier) {
          totalArticles = panierRes.panier.reduce((acc: number, item: any) => acc + Number(item.quantite), 0);
        }

        if (totalArticles >= 10) {
          this.message = "Vous avez atteint la limite de 10 articles dans votre panier.";
          this.cd.detectChanges();
        } else {
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
      },
      error: (err) => console.error("Erreur vérification panier", err)
    });
  }
}