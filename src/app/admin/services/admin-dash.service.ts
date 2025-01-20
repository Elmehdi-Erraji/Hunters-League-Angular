import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashService {

  private apiUrl = 'http://localhost:8080/api/dashboard/statistics'; // Replace with your backend API URL
  private statistics: any = {
    competitions: 1000,
    users: 2007,
    hunts: 111295739,
    participation: 2000003,
  };

  constructor(private http: HttpClient) {}

  // Fetch data from the backend
  fetchStatistics(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Get the statistics (standard or fetched)
  getStatistics() {
    return this.statistics;
  }

  // Update the statistics with fetched data
  updateStatistics(data: any) {
    this.statistics = data;
  }}
