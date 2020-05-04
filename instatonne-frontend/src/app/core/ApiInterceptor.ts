import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private token$ = new ReplaySubject<string>(1);

  constructor(private authService: AuthService) {
    authService.getToken().subscribe(this.token$);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Apply the headers
    return this.token$.pipe(switchMap(token => {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });

      // Also handle errors globally
      return next.handle(req).pipe(
        tap(x => x, err => {
          // Handle this err
          console.error(`Error performing request, status code = ${err.status}`);
        })
      );
    }));

  }
}
