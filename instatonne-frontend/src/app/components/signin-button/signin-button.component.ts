import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin-button',
  templateUrl: './signin-button.component.html',
  styleUrls: ['./signin-button.component.scss']
})
export class SigninButtonComponent implements AfterViewInit {

  constructor(
    private authService: AuthService
  ) { }

  ngAfterViewInit(): void {
    this.authService.renderButton('signin-button');
  }

}
