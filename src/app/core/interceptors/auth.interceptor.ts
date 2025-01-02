import {

  HttpInterceptorFn,
  HttpHeaders
} from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🔥 Interceptor running');

  const token = localStorage.getItem('access_token');
  console.log('Token found:', !!token);

  if (token) {
    const clonedRequest = req.clone({
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json')
    });

    console.log('Request headers:', clonedRequest.headers.keys());
    console.log('Authorization header:', clonedRequest.headers.get('Authorization'));

    return next(clonedRequest);
  }

  console.warn('No token found - proceeding without authorization');
  return next(req);
};
