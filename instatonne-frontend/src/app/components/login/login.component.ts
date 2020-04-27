import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ApplicationRef, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'src/app/generated/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user$: Observable<User>;
  authUser$: Observable<gapi.auth2.GoogleUser>;
  shouldRegister$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadGAPI();
    window['onSignIn'] = this.onSignIn.bind(this);

    this.user$ = this.authService.getUser();
    this.authUser$ = this.authService.getAuthUser();
  }

  public onSignIn(googleUser: gapi.auth2.GoogleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    console.log(googleUser.getAuthResponse().id_token);
    this.ngZone.run(() => {
      this.authService.setAuthUser(googleUser);
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
      node.src = 'https://apis.google.com/js/platform.js';
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  onRegister(f: NgForm) {
    if (!f.valid) { return; }
    this.authService.createUser(f.value.username);
    console.log(f.value);
  }

}
