import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private token: string;

  constructor(private authService: AuthService) {
    authService.getToken().subscribe(tkn => {
      this.token = tkn;
    });
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Apply the headers
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.token
      }
    });

    // Also handle errors globally
    return next.handle(req).pipe(
      tap(x => x, err => {
        // Handle this err
        console.error(`Error performing request, status code = ${err.status}`);
      })
    );
  }
}
