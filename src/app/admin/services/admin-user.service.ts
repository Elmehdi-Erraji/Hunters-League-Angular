import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminUserService {
  private apiUrl = 'http://localhost:8080/api/users'; // Base URL

  constructor(private http: HttpClient) {}

  // Find all users with pagination
  findAll(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    console.log('Making request with params:', params.toString());

    return this.http.get<any>(`${this.apiUrl}/findAll`, {
      params,
      // Adding these headers explicitly for debugging
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

  // Create user
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, user);
  }

  // Update user
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, user);
  }

  // Delete user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
