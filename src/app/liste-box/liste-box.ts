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
  nom_utilisateur: string | null = '';

  constructor(private data: Data) { }

  ngOnInit(): void {
    this.boxes$ = this.data.getBoxesAPI();
    //regler erreur localStorage
    if (typeof window !== 'undefined') {
      this.nom_utilisateur = localStorage.getItem('user_nom');
    }
  }

  addPanier(idBox: number): void {
    this.data.addToPanier(idBox).subscribe((res: any) => {

      if (res.id_commande && typeof window !== 'undefined') {
        localStorage.setItem('id_commande', res.id_commande);
      }

      console.log('Ajout de la box réussie');
    });
  }
}