import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private basicAuthenticationService: BasicAuthenticationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let username = this.basicAuthenticationService.getAuthenticatedUser();
    let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedUser();

    if (username && basicAuthHeaderString) {
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      });
    }
    return next.handle(req);
  }
}
