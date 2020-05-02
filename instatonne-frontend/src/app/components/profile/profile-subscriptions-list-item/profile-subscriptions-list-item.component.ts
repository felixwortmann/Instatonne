import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/generated/models';
import { UsersService } from 'src/app/generated/services';

@Component({
  selector: 'app-profile-subscriptions-list-item',
  templateUrl: './profile-subscriptions-list-item.component.html',
  styleUrls: ['./profile-subscriptions-list-item.component.scss']
})
export class ProfileSubscriptionsListItemComponent implements OnInit {

  @Input() user: User;

  @Output() updateTriggered = new EventEmitter<string>();

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
  }

  follow() {
    this.usersService.followUserWithName({ username: this.user.username }).subscribe(_ => {
      this.updateTriggered.emit('update');
    });
  }

}
