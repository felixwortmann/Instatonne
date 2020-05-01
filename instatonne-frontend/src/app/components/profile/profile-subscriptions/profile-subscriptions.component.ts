import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/generated/services';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { ReplaySubject, Observable } from 'rxjs';
import { User } from 'src/app/generated/models';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-profile-subscriptions',
  templateUrl: './profile-subscriptions.component.html',
  styleUrls: ['./profile-subscriptions.component.scss']
})
export class ProfileSubscriptionsComponent implements OnInit {

  user$ = new ReplaySubject<User>(1);

  followers$ = new ReplaySubject<User[]>(1);
  following$ = new ReplaySubject<User[]>(1);

  selectedIndex$: Observable<number>;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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

    this.selectedIndex$ = this.activatedRoute.queryParamMap.pipe(map(x => {
      if (x.get('tab') === '1') {
        return 1;
      } else {
        return 0;
      }
    }));
  }

  nextIndex($index: MatTabChangeEvent) {
    this.router.navigate([], { queryParams: { tab: $index }, replaceUrl: true });
  }

}
