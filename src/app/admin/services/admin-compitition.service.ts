import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable, catchError, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminCompetitionService {
  private apiUrl = 'http://localhost:8080/api/competitions'; // Base URL

  constructor(private http: HttpClient) {}

  // Find all competitions with pagination
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

  // Create competition
  createCompetition(competition: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, competition, {
      responseType: 'text',
    });
  }

  // Update competition
  updateCompetition(id: string, competition: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, competition);
  }

  // Delete competition
  deleteCompetition(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  // Get competition by ID
  getCompetitionById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/find/${id}`).pipe(
      tap((response: any) => console.log('Competition fetched:', response)),

    catchError((error) => {
        console.error('Error fetching competition by ID:', error);
        throw error;
      })
    );
  }
}
