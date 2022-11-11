import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: new HttpHeaders({
        'X-RapidAPI-Key': '7e80361849mshd5e056c14bd675cp17ae7ajsnbfb9586a5126',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
      })
    });
    return next.handle(authReq);
  }
}
