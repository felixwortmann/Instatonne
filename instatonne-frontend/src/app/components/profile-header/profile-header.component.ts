import { Component, OnInit } from '@angular/core';
import { User } from '../../generated/models/user';
import { UsersService } from '../../generated/services';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.scss']
})
export class ProfileHeaderComponent implements OnInit {

  user: User;

  constructor(
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    // this.usersService.getUserByName({username: 'test'}).pipe().subscribe((user: User) => {
    //     this.user = user;
    //   }
    // );
    this.user = { username: 'testName', profileDescription: 'testBeschreibung' };
  }

}
