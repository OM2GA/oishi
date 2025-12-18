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

  constructor(private data: Data) { }

  ngOnInit(): void {
    this.boxes$ = this.data.getBoxesAPI();
  }
}