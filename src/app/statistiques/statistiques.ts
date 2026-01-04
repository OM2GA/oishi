import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Data } from '../data';
@Component({
  selector: 'app-statistiques',
  imports: [Footer, Header],
  templateUrl: './statistiques.html',
  styleUrl: './statistiques.css',
})
export class Statistiques implements AfterViewInit {

  @ViewChild('chartCommande') chartCommandeRef!: ElementRef<HTMLCanvasElement>;
    @ViewChild('chartJour') chartJourRef!: ElementRef<HTMLCanvasElement>;
  constructor(private data: Data) {}

  ngAfterViewInit():void {
    /* GRAPHIQUE 1 */
    this.data.getStatsCommandesParBox().subscribe(data => {

      const labels = data.map(item => item.nom);
      const values = data.map(item => Number(item.total));

        new Chart(this.chartCommandeRef.nativeElement, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Nombre de commandes',
            data: values,
            backgroundColor: 'white', 
          }]
        },
        options: {
          plugins: {
            legend: {
              display: false
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1, 
                color: 'white'
              },
              grid: {
                color: '#666666' // Couleur des lignes de fond
              }
            },
            x: {
              ticks: { color: 'white' },
              grid: {
                color: '#666666' // Couleur des lignes de fond
              },
            },
          }
        }
      });
    });
    /* ===== GRAPH 2 : Commandes par jour (LINE) ===== */
    this.data.getStatsCommandesParJour().subscribe(data => {

      const labels = data.map(item => item.jour);
      const values = data.map(item => Number(item.total));

      new Chart(this.chartJourRef.nativeElement, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Commandes par jour',
            data: values,
            borderColor: 'white',
            backgroundColor: 'rgba(255,255,255,0.2)',
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: 'white' },
              grid: { color: '#666666' }
            },
            x: {
              ticks: { color: 'white' },
              grid: { color: '#666666' }
            }
          }
        }
      });
    });

  }
}

