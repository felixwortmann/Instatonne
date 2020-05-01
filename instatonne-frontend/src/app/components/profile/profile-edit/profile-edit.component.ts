import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { User } from 'src/app/generated/models';
import { UsersService } from 'src/app/generated/services';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { shareReplay, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

  user$ = new ReplaySubject<User>(1);

  profileEditForm = new FormGroup({
    altName: new FormControl(''),
    profileDescription: new FormControl(''),
  });


  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usersService.getUserMe().subscribe(this.user$);
    this.user$.subscribe(user => {
      console.log('user', user);
      this.profileEditForm.setValue({
        altName: user.altName,
        profileDescription: user.profileDescription
      });
    });
  }

  commitEdit() {
    console.log(this.profileEditForm.value);
    this.user$.pipe(
      take(1),
      switchMap(user => {
        const nextUser: User = Object.assign(user, this.profileEditForm.value);
        console.log(nextUser);
        return this.usersService.updateUser({ body: nextUser });
      })
    ).subscribe(user => {
      this.router.navigate(['/u/' + user.username]);
    });
  }

}
