import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { User } from '../generated/models';
import { switchMap, mapTo, map, tap } from 'rxjs/operators';
import { UsersService } from '../generated/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new ReplaySubject<gapi.auth2.GoogleUser>(1);
  private username = new Subject<string>();

  constructor(
    private userService: UsersService
  ) { }

  setUser(user: gapi.auth2.GoogleUser) {
    this.user.next(user);
  }

  getToken(): Observable<string> {
    return this.user.pipe(map(x => x.getAuthResponse().id_token));
  }

  getUsername(): Observable<string> {
    return this.user.pipe(
      switchMap(_ => {
        return this.userService.getUserMe();
      }),
      map(x => x.id)
    );
  }
}
