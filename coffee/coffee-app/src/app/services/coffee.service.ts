import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://35.81.164.71:8081';
//const baseUrl = 'http://localhost:8081';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  constructor(private http: HttpClient) { }

  brew(cup_size: any, grain_size: any, delay: any): Observable<any> {
    let body = new HttpParams({
      fromObject : {
        'cup_size' : cup_size,
        'grain_size' : grain_size,
        'delay' : delay
      }
    })
    return this.http.post(`${baseUrl}/brew`, body);
  }

  refill(water: any, beans: any): Observable<any> {
    let body = new HttpParams({
      fromObject : {
        'water' : water,
        'beans' : beans
      }
    })
    return this.http.post(`${baseUrl}/refill`, body);
  }

  levels(): Observable<any> {
    console.log("CoffeeService levels");
    return this.http.get(`${baseUrl}/level`);
  }
}
