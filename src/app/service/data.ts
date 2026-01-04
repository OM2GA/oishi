import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Data {
  API_URL = 'http://localhost/Angular/oishi/api/'; // MAMP: ":8888"; XAMPP:"";
  constructor(private http: HttpClient) { }

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
  addToPanier(idBox: number) {
    let idClient = null;
    let idCommande = null;

    if (typeof localStorage !== 'undefined') {
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
    );
  }

  getPanier() {
    let IDclient = null;
    if (typeof localStorage !== 'undefined') {
      IDclient = localStorage.getItem('user_id');
    }
    return this.http.get(this.API_URL + "panier/get_panier.php?id_client=" + IDclient);
  }

  deleteFromCart(idBox: number) {
    let idCommande = null;
    if (typeof localStorage !== 'undefined') {
      idCommande = localStorage.getItem('id_commande');
    }
    return this.http.delete(this.API_URL + "panier/delete_panier.php?id_box=" + idBox + "&id_commande=" + idCommande);
  }

  getHistorique() {
    let idClient = null;
    if (typeof localStorage !== 'undefined') {
      idClient = localStorage.getItem('user_id');
    }
    return this.http.get(this.API_URL + "commandes/get_historique.php?id_client=" + idClient);
  }

  getStatsCommandesParBox() {
    return this.http.get<any[]>(this.API_URL + "stats/commande_par_boxe.php");
  }
  getStatsCommandesParJour() {
    return this.http.get<any[]>(this.API_URL + 'stats/commandes_par_jour.php');
  }
  
  validerCommande(idCommande: number) {
    return this.http.post(this.API_URL + 'commandes/valider_commande.php', { id_commande: idCommande });
  }
}
