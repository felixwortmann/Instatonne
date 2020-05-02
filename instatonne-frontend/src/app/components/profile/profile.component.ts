import { Component, OnInit } from '@angular/core';
import { Post, User } from '../../generated/models';
import { UsersService } from '../../generated/services';
import { AuthService } from '../../services/auth.service';
import { Observable, of, ReplaySubject, EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$ = new ReplaySubject<User>(1);
  posts$: Observable<Post[]>;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(switchMap(x => {
      const username = x.get('username');
      if (username === null) {
        this.authService.getUser().subscribe(user => {
          this.router.navigate(['/u/' + user.username]);
        }, _ => {
          // if the current user cannot be retrieved, then the user
          // probably needs to register first. redirect to login page
          this.router.navigate(['/login']);
        });
        return EMPTY;
      } else {
        return this.usersService.getUserByName({ username });
      }
    })).subscribe(this.user$);
    this.posts$ = this.user$.pipe(switchMap(user => {
      return this.usersService.getPostsByUserName({ username: user.username });
    }));
  }

}
