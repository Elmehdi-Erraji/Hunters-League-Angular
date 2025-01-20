import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminParticipationService {
  private apiUrl = 'http://localhost:8080/api/participations';
  constructor(private http: HttpClient) { }

  findAll(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/findAll`, { params }).pipe(
      catchError((error) => {
        console.error('Service error:', error);
        throw error;
      })
    );
  }

}
