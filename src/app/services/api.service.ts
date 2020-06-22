import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'https://sleepy-ravine-73430.herokuapp.com/';
  constructor(
    private http: HttpClient
  ) { }

  async POST(url: string, body: any) {
    return await new Promise(r => {
      console.log(body);
      this.http.post<any>(url, body).subscribe(data => {
        console.log(data);
        r(data);
      });
    });
  }
  async GET(url: string) {
    return await new Promise(r => {
      this.http.get<any>(url).subscribe(data => {
        r(data);
      });
    });
  }
}
