import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root', // Ensure the service is provided in the root injector
})
export class AdminSpecyService {
  private apiUrl = 'http://localhost:8080/api/species'; // Base URL

  constructor(private http: HttpClient) {}

  // Find all species with pagination
  findAll(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/findAll`, {
      params,
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(error => {
        console.error('Service error:', error);
        throw error;
      })
    );
  }

  // Create species
  createSpecies(species: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, species,{
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text'
    });
  }

  // Update species
  updateSpecie(id: string, species: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, species, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  // Delete species
  deleteSpecies(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  // Get species by ID
  getSpecieById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      catchError(error => {
        console.error('Error fetching species by ID:', error);
        throw error;
      })
    );
  }
}
