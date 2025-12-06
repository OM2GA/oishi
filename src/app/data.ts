import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Data {
  API_URL = 'http://localhost/Angular/oishi/api/';
  constructor(private http: HttpClient) { }
  
getBoxesAPI() {
  return this.http.get(this.API_URL + "boxes.php");
}

}
