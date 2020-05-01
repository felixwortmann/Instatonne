import { Component, OnInit } from '@angular/core';
import { Post, User } from '../../generated/models';
import { UsersService } from '../../generated/services';
import { AuthService } from '../../services/auth.service';
import { Observable, of, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(switchMap(x => {
      const username = x.get('username');
      if (username === null) {
        return this.authService.getUser();
      } else {
        return this.usersService.getUserByName({ username });
      }
    })).subscribe(this.user$);
    this.posts$ = this.user$.pipe(switchMap(user => {
      return this.usersService.getPostsByUserName({ username: user.username });
    }));
  }

}
