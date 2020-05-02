import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../generated/models/user';
import { UsersService } from '../../../generated/services';
import { Observable, BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { map, switchMap, take } from 'rxjs/operators';

import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { SubscriptionBottomSheetComponent } from '../../subscription-bottom-sheet/subscription-bottom-sheet.component';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {

  @Input() user$: Subject<User>;

  constructor(
    private usersService: UsersService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {

  }

  follow() {
    this.user$.pipe(take(1)).subscribe(user => {
      this.usersService.followUserWithName({ username: user.username }).subscribe(this.user$);
    });
  }

  unfollow() {
    this.user$.pipe(take(1)).subscribe(user => {
      const ref = this.bottomSheet.open<SubscriptionBottomSheetComponent, any, boolean>(SubscriptionBottomSheetComponent);
      ref.afterDismissed().subscribe(result => {
        if (result) {
          this.usersService.unfollowUserWithName({ username: user.username }).subscribe(this.user$);
        }
      });
    });

  }

}
