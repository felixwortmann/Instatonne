import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/generated/models';
import { ActivatedRoute } from '@angular/router';
import { switchMap, shareReplay } from 'rxjs/operators';
import { UsersService } from 'src/app/generated/services';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

  user$: Observable<User>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.user$ = this.activatedRoute.paramMap.pipe(
      switchMap(x => {
        const username = x.get('username');
        if (username === null) {
          return EMPTY;
        } else {
          return this.usersService.getUserByName({ username });
        }
      }),
      shareReplay(1)
    );
  }

}
