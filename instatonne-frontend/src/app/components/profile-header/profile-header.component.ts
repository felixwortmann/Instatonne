import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../generated/models/user';
import { UsersService } from '../../generated/services';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {

  @Input() user$: Observable<User>;
  profilePictureUrl$: Observable<URL>;
  isSelf$: Observable<boolean>;

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.isSelf$ = combineLatest([this.authService.getUser(), this.user$]).pipe(
      map(users => {
        return (users[0].username === users[1].username);
      })
    );
    this.profilePictureUrl$ = this.authService.getAuthUser().pipe(
      map(x => new URL(x.getBasicProfile().getImageUrl()))
    );
  }

  follow(): void {
    this.user$.subscribe(user => {
      this.usersService.followUserWithName({ username: user.username }).subscribe();
    });
  }

}
