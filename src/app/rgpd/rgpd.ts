import { Component } from '@angular/core';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-rgpd',
  standalone: true,
  imports: [Header, Footer],
  templateUrl: './rgpd.html',
  styleUrl: './rgpd.css'
})
export class Rgpd { }
