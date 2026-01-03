import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { of, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Data {
  API_URL = 'http://localhost/Angular/oishi/api/'; // MAMP: ":8888"; XAMPP:"";

  private cartSubject = new BehaviorSubject<any>(null);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  getBoxesAPI() {
    return this.http.get(this.API_URL + "boxes/boxes.php");
  }

  getBoxById(id: number) {
    return this.http.get(this.API_URL + "boxes/get_boxid.php?id=" + id);
  }

  login(data: any) {
    return this.http.post(this.API_URL + "users/login.php", data);
  }

  register(data: any) {
    return this.http.post(this.API_URL + "users/register.php", data);
  }

  /* Panier*/

  loadCart() {
    this.getPanier().subscribe((data) => {
      this.cartSubject.next(data);
    });
  }

  addToPanier(idBox: number) {
    let idClient = null;
    let idCommande = null;

    if (isPlatformBrowser(this.platformId)) {
      idClient = localStorage.getItem('user_id');
      idCommande = localStorage.getItem('id_commande');
    }

    const data: any = {
      id_client: idClient,
      id_box: idBox
    };

    if (idCommande) {
      data.id_commande = idCommande;
    }

    return this.http.post<any>(
      this.API_URL + 'panier/add_panier.php',
      data
    ).pipe(
      tap(() => this.loadCart())
    );
  }

  getPanier() {
    if (isPlatformBrowser(this.platformId)) {
      const IDclient = localStorage.getItem('user_id');
      return this.http.get<any>(this.API_URL + "panier/get_panier.php?id_client=" + IDclient);
    }
    return of(null);
  }

  deleteFromCart(idBox: number) {
    if (isPlatformBrowser(this.platformId)) {
      const idCommande = localStorage.getItem('id_commande');
      return this.http.delete<any>(this.API_URL + "panier/delete_panier.php?id_box=" + idBox + "&id_commande=" + idCommande).pipe(
        tap(() => this.loadCart())
      );
    }
    return of(null);
  }

  getHistorique() {
    if (isPlatformBrowser(this.platformId)) {
      const idClient = localStorage.getItem('user_id');
      return this.http.get<any>(this.API_URL + "commandes/get_historique.php?id_client=" + idClient);
    }
    return of(null);
  }
  getStatsCommandesParBox() {
    return this.http.get<any[]>(this.API_URL + "stats/commandes_par_box.php");
  }

  validerCommande(idCommande: number) {
    return this.http.post(this.API_URL + 'commandes/valider_commande.php', { id_commande: idCommande }).pipe(
      tap(() => this.loadCart())
    );
  }
}
