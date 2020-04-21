import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadGAPI();
    window['onSignIn'] = this.onSignIn;
  }

  public onSignIn(googleUser: gapi.auth2.GoogleUser) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    console.log(googleUser.getAuthResponse().id_token);
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

}
