import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { Commerce } from './commerce';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {
  // static getCommerces() {
  //   throw new Error('Method not implemented.');
  // }

  private randomDataAPI = 'https://random-data-api.com/api/commerce/random_commerce?size=100';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCommerces(): Observable<Commerce[]> {
    return this.http.get<Commerce[]>(this.randomDataAPI)
      .pipe(
        tap(_ => console.log('fetched commerces', _)),
        catchError(this.handleError<Commerce[]>('getCommerces', []))
        // catchError(_ => console.log('fetched commerces', _))
      );
  }

  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}

