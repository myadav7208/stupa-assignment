import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = sessionStorage.getItem('token');
    if (authToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
