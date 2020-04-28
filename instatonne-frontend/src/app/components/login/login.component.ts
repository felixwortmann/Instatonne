import {Component, OnInit, AfterViewInit, ChangeDetectorRef, ApplicationRef, NgZone} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {Observable, of, Subject} from 'rxjs';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from 'src/app/generated/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user$: Observable<User>;
  authUser$: Observable<gapi.auth2.GoogleUser>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
    this.authUser$ = this.authService.getAuthUser();

    this.user$.pipe(filter(user => !!user)).subscribe(_ => {
      this.router.navigate(['profile'], {replaceUrl: true});
    });
  }


  onRegister(f: NgForm) {
    if (!f.valid) {
      return;
    }
    this.authService.createUser(f.value.username);
    console.log(f.value);
  }

  logout() {
    this.authService.logOut();
  }
}
