import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberParticipationService {
  private apiUrl = 'http://localhost:8080/api/participations';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getParticipationsByUser(page: number, size: number): Observable<any> {
    // const userId = this.authService.getUserId();
    const userId = 'c1b92d34-219c-45c3-976a-3ea7357daefd';

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const requestUrl = `${this.apiUrl}/findForUser/${userId}`;

    return this.http.get(requestUrl, { params }).pipe(
      tap((response: any) => {
        console.log('Received response:', response);
        console.log('page:', response.pageable.totalPages);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error in request:', {
          url: requestUrl,
          status: error.status,
          message: error.message,
          error: error.error,
        });
        return throwError(
          () =>
            new Error(
              'Failed to fetch participations. Please check your connection and try again.'
            )
        );
      })
    );
  }
}
