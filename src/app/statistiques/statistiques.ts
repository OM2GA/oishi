import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Data } from '../data';
@Component({
  selector: 'app-statistiques',
  imports: [Footer, Header],
  templateUrl: './statistiques.html',
  styleUrl: './statistiques.css',
})
export class Statistiques implements OnInit {
  constructor(private data: Data) {}
  ngOnInit() {
    this.data.getStatsCommandesParBox().subscribe(data => {

      const labels = data.map(item => item.nom);
      const values = data.map(item => item.total);

      new Chart('commandesParBoxChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Nombre de commandes',
            data: values
          }]
        }
      });

    });
  }
}

