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
    return this.http.post(this.API_URL + 'users/login.php', data);
  }

  register(data: any) {
    return this.http.post(this.API_URL + 'users/register.php', data);
  }
}
