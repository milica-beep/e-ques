import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('INTERCEPTOR TRIGGERED');
    console.log(this.auth.getToken());
    
    request = request.clone({
     // withCredentials : true,
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
        // Cookies: `access_token_cookie=${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }
}