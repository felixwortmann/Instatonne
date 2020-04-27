import { Injectable, NgZone } from '@angular/core';
import { Subject, Observable, BehaviorSubject, ReplaySubject, of, empty, EMPTY, combineLatest, throwError } from 'rxjs';
import { User } from '../generated/models';
import { switchMap, mapTo, map, tap, catchError, mergeMap, share } from 'rxjs/operators';
import { UsersService } from '../generated/services';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser = new ReplaySubject<gapi.auth2.GoogleUser>(1);
  private reloadUser = new BehaviorSubject<null>(null);
  private username = new Subject<string>();

  constructor(
    private userService: UsersService,
    private cookieService: CookieService,
    private ngZone: NgZone
  ) {
    this.loadGAPI();
    window['onSignIn'] = this.onSignIn.bind(this);
    window['gapiInit'] = this.onAPILoad.bind(this);

    // this.cookieService.get
  }

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
          console.log('a bad error :( ', err);
          throwError(err);
        }));
      }),
      share()
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

  public onSignIn(googleUser: gapi.auth2.GoogleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    console.log(googleUser.getAuthResponse().id_token);
    this.ngZone.run(() => {
      this.setAuthUser(googleUser);
    });
  }

  public onAPILoad() {
    gapi.load('auth2', () => {
      gapi.auth2.init({}).then(_ => {
        const signedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
        if (signedIn) {
          this.ngZone.run(() => {
            this.setAuthUser(gapi.auth2.getAuthInstance().currentUser.get());
          });
        }
        console.log('signed in', gapi.auth2.getAuthInstance().isSignedIn.get());
      });
      /*gapi.auth2.getAuthInstance().signIn();
      console.log('auth api inited');*/
    });
  }

  private loadGAPI() {
    let isFound = false;
    const scripts = Array.from(document.getElementsByTagName('script'));
    for (const script of scripts) {
      if (script.getAttribute('src') != null && script.getAttribute('src').includes('https://apis.google.com/js/platform.js')) {
        isFound = true;
      }
    }

    if (!isFound) {
      const node = document.createElement('script');
      node.src = 'https://apis.google.com/js/platform.js?onload=gapiInit';
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

}
