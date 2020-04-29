import { Component, OnInit } from '@angular/core';
import { User } from '../../generated/models/user';
import { UsersService } from '../../generated/services';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {

  user$: Observable<User>;
  profilePictureUrl$: Observable<URL>;

  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    // this.usersService.getUserByName({username: 'test'}).pipe().subscribe((user: User) => {
    //     this.user = user;
    //   }
    // );
    this.user$ = this.authService.getUser();
    this.profilePictureUrl$ = this.authService.getAuthUser().pipe(
      map(x => new URL(x.getBasicProfile().getImageUrl()))
    );
  }

}
