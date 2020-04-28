import {Component, OnInit} from '@angular/core';
import {Post, User} from '../../generated/models';
import {UsersService} from '../../generated/services';
import {AuthService} from '../../services/auth.service';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

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
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
    this.posts$ = this.user$.pipe(switchMap(user => {
      return this.usersService.getPostsByUserName({username: user.username});
    }));
    // for testing
    // this.posts$ = of([{imageUrl: 'https://via.placeholder.com/1080'}, {imageUrl: 'https://via.placeholder.com/1080'}, {imageUrl: 'https://via.placeholder.com/1080'}, {imageUrl: 'https://via.placeholder.com/1080'}, {imageUrl: 'https://via.placeholder.com/1080'}, {imageUrl: 'https://via.placeholder.com/1080'}, {imageUrl: 'https://via.placeholder.com/1080'}]);
  }

}
