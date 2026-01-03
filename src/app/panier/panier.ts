import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../data';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panier',
  imports: [CommonModule, Footer, Header, RouterModule],
  templateUrl: './panier.html',
  styleUrl: './panier.css',
})
export class Panier implements OnInit {
  panier$: Observable<any> | undefined;

  constructor(private data: Data) { }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.panier$ = this.data.getPanier();
  }

  supprimer(idBox: number) {
    this.data.deleteFromCart(idBox).subscribe({
      next: (data) => {
        console.log('Supprimé', data);
        this.loadCart();
      },
      error: (err) => console.error('Erreur suppression', err)
    });
  }
  isOrderValidated = false;
  heureLivraison = '';

  payer() {
    const idCommande = localStorage.getItem('id_commande');

    if (!idCommande) {
      alert('Aucune commande à valider');
      return;
    }

    this.data.validerCommande(Number(idCommande)).subscribe((res: any) => {
      const date = new Date();
      date.setHours(date.getHours() + 1);
      this.heureLivraison = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.isOrderValidated = true;
      console.log('Commande validée', res);
    });
  }

  CloseOverlay() {
    this.isOrderValidated = false;
    localStorage.removeItem('id_commande');
    this.loadCart();
  }
}


