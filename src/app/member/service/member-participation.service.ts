import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MemberParticipationService {

  private apiUrl = 'http://localhost:8080/api/participations'; // Base URL

  constructor(private http: HttpClient) {}
}
