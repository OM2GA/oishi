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
    this.ActualiserPanier();
  }

  ActualiserPanier() {
    this.panier$ = this.data.getPanier();
  }
  
  supprimer(idBox: number) {
    this.data.deleteFromCart(idBox).subscribe((data) => {
      // actualiser le panier apres que un element soit supprimé
      console.log('Supprimé', data);
      this.ActualiserPanier();
    });
  }
}
