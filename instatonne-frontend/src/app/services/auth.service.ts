import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, ReplaySubject, of, empty, EMPTY, combineLatest, throwError } from 'rxjs';
import { User } from '../generated/models';
import { switchMap, mapTo, map, tap, catchError, mergeMap } from 'rxjs/operators';
import { UsersService } from '../generated/services';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser = new ReplaySubject<gapi.auth2.GoogleUser>(1);
  private reloadUser = new BehaviorSubject<null>(null);
  private username = new Subject<string>();

  constructor(
    private userService: UsersService
  ) { }

  setAuthUser(user: gapi.auth2.GoogleUser) {
    this.authUser.next(user);
  }

  getToken(): Observable<string> {
    return this.authUser.pipe(map(x => x.getAuthResponse().id_token));
  }

  getUsername(): Observable<string> {
    return this.getUser().pipe(
      map(x => x.id)
    );
  }

  getAuthUser(): Observable<gapi.auth2.GoogleUser> {
    return this.authUser;
  }

  getUser(): Observable<User | null> {
    return combineLatest([this.authUser, this.reloadUser]).pipe(
      switchMap(_ => {
        console.log('reloading user');
        return this.userService.getUserMe().pipe(catchError(err => {
          if (err instanceof HttpErrorResponse && err.status === 404) {
            // if the user does not yet exist, we are fine with it and ask the user to register
            return EMPTY;
          }
          throwError(err);
        }));
      })
    );
  }

  createUser(username: string) {
    this.userService.createNewUser({
      body: {
        username,
        profileDescription: ''
      }
    }).subscribe(_ => {
      console.log('attempting to reload user');
      this.reloadUser.next(null);
    });
  }

}
