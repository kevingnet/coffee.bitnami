import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CoffeeEngine } from './coffee-engine';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private readonly engine = new CoffeeEngine();

  constructor(private http: HttpClient) { }

  brew(cup_size: number | undefined, grain_size: number | undefined, delayMs: number | undefined): Observable<{ water: number; beans: number }> {
    if (environment.useClientEngine) {
      try {
        const result = this.engine.brew(cup_size ?? 5, grain_size ?? 5, delayMs ?? 0);
        return of(result).pipe(delay(150));
      } catch (err) {
        return throwError(() => err);
      }
    }
    const body = new HttpParams({
      fromObject: {
        cup_size: String(cup_size),
        grain_size: String(grain_size),
        delay: String(delayMs),
      }
    });
    return this.http.post<{ water: number; beans: number }>(`${environment.apiUrl}/brew`, body);
  }

  refill(water: number | undefined, beans: number | undefined): Observable<{ water: number; beans: number }> {
    if (environment.useClientEngine) {
      return of(this.engine.refill(water, beans)).pipe(delay(100));
    }
    const body = new HttpParams({
      fromObject: {
        water: String(water),
        beans: String(beans),
      }
    });
    return this.http.post<{ water: number; beans: number }>(`${environment.apiUrl}/refill`, body);
  }

  levels(): Observable<{ water: number; beans: number }> {
    if (environment.useClientEngine) {
      return of(this.engine.levels());
    }
    return this.http.get<{ water: number; beans: number }>(`${environment.apiUrl}/level`);
  }
}
