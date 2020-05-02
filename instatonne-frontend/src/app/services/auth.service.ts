import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, Observable, ReplaySubject, Subject, throwError } from 'rxjs';
import { User } from '../generated/models';
import { catchError, map, share, switchMap } from 'rxjs/operators';
import { UsersService } from '../generated/services';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authInstance: gapi.auth2.GoogleAuth;
  private authUser = new ReplaySubject<gapi.auth2.GoogleUser>(1);
  private reloadUser = new BehaviorSubject<null>(null);

  private loaded = false;
  private didLoad = new Subject<boolean>();

  constructor(
    private userService: UsersService,
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
    return this.authUser.pipe(map(x => x?.getAuthResponse().id_token));
  }

  getAuthUser(): Observable<gapi.auth2.GoogleUser> {
    return this.authUser;
  }

  getUser(): Observable<User | null> {
    return combineLatest([this.authUser, this.reloadUser]).pipe(
      switchMap(_ => {
        console.log('reloading user');
        return this.userService.getUserMe();
      }),
      share()
    );
  }

  createUser(username: string): Observable<User> {
    return this.userService.createNewUser({
      body: {
        username,
        profileDescription: ''
      }
    });
  }

  public async logOut() {
    await this.authInstance?.signOut();
    this.authUser.next(null);
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

  public async renderButton(id: string) {
    await this.awaitLoad();
    console.log('Will render login button into', id);
    console.log(document.getElementById(id));
    gapi?.signin2.render(id, {
      scope: 'email',
      width: 200,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSignIn.bind(this),
      onfailure: null
    });
  }

  private async awaitLoad() {
    if (this.loaded) {
      return;
    } else {
      await this.didLoad.toPromise();
      this.loaded = true;
      return;
    }
  }

  public onAPILoad() {
    gapi.load('auth2', () => {
      gapi.auth2.init({}).then(_ => {
        this.authInstance = gapi.auth2.getAuthInstance();
        const signedIn = this.authInstance.isSignedIn.get();
        this.ngZone.run(() => {
          this.didLoad.complete();
          if (signedIn) {
            this.setAuthUser(this.authInstance.currentUser.get());
          }
        });
      });
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
