import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/generated/models';

@Component({
  selector: 'app-profile-subscriptions-list-item',
  templateUrl: './profile-subscriptions-list-item.component.html',
  styleUrls: ['./profile-subscriptions-list-item.component.scss']
})
export class ProfileSubscriptionsListItemComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit(): void {
  }

}
