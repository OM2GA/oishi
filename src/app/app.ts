import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer'; // Import du Footer

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer], // Ajout du Footer aux imports
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('oishi');
}