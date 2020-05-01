import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/generated/services';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';
import { User } from 'src/app/generated/models';

@Component({
  selector: 'app-profile-subscriptions',
  templateUrl: './profile-subscriptions.component.html',
  styleUrls: ['./profile-subscriptions.component.scss']
})
export class ProfileSubscriptionsComponent implements OnInit {

  user$ = new ReplaySubject<User>(1);

  followers$ = new ReplaySubject<User[]>(1);
  following$ = new ReplaySubject<User[]>(1);

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(switchMap(x => {
      const username = x.get('username');
      if (username !== null) {
        return this.usersService.getFollowersForUsername({ username });
      }
    })).subscribe(this.followers$);
    this.activatedRoute.paramMap.pipe(switchMap(x => {
      const username = x.get('username');
      if (username !== null) {
        return this.usersService.getFollowingForUsername({ username });
      }
    })).subscribe(this.following$);
  }

}
