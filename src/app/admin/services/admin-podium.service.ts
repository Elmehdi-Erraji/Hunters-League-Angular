import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminPodiumService {

  private apiUrl = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) { }
}
