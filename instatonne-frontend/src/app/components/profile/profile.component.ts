import { Component, OnInit } from '@angular/core';
import { Post, User } from '../../generated/models';
import { UsersService } from '../../generated/services';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Observable<User>;
  posts$: Observable<Post[]>;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.activatedRoute.paramMap.pipe(switchMap(x => {
      const username = x.get('username');
      if (username === null) {
        return this.authService.getUser();
      } else {
        return this.usersService.getUserByName({ username });
      }
    }));
    this.posts$ = this.user$.pipe(switchMap(user => {
      return this.usersService.getPostsByUserName({ username: user.username });
    }));
    // for testing
  }

}
