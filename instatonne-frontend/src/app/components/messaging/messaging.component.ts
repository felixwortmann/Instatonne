import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY, BehaviorSubject, combineLatest, timer } from 'rxjs';
import { User, Message } from 'src/app/generated/models';
import { ActivatedRoute } from '@angular/router';
import { switchMap, shareReplay, take } from 'rxjs/operators';
import { UsersService, MessagesService } from 'src/app/generated/services';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

  user$: Observable<User>;
  messages$: Observable<Message[]>;

  reloadMessages$ = timer(0, 500);

  messageText = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private messagesService: MessagesService
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

    this.messages$ = combineLatest([this.user$, this.reloadMessages$]).pipe(
      switchMap(result => {
        const user = result[0];
        return this.messagesService.getMessagesWithUser({ username: user.username });
      }),
      shareReplay(1)
    );
  }

  sendMessage() {
    this.user$.pipe(take(1)).subscribe(user => {
      this.messagesService.sendMessageToUser({ username: user.username, body: { message: this.messageText } }).subscribe(m => {
        this.messageText = '';
        console.log(m);
      });
    });
  }

}
