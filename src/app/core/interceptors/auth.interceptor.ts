import {

  HttpInterceptorFn,
  HttpHeaders
} from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('access_token');
  if (token) {
    const clonedRequest = req.clone({
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
    });

    return next(clonedRequest);
  }
  return next(req);
};
