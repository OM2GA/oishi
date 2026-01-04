import { Component, OnInit } from '@angular/core';
import { Data } from '../../service/data';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-historique-commandes',
  imports: [CommonModule, Header, Footer],
  templateUrl: './historique-commandes.html',
  styleUrl: './historique-commandes.css',
})
export class HistoriqueCommandes implements OnInit {
  historique$: Observable<any> | undefined;
  constructor(private data: Data) { }

  ngOnInit(): void {
    this.historique$ = this.data.getHistorique();
  }

}
