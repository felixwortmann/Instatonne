import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY, BehaviorSubject, combineLatest, timer } from 'rxjs';
import { User, Message } from 'src/app/generated/models';
import { ActivatedRoute } from '@angular/router';
import { switchMap, shareReplay, take } from 'rxjs/operators';
import { UsersService, MessagesService } from 'src/app/generated/services';
import { RxStomp } from '@stomp/rx-stomp';
import { InstantMessagingService } from 'src/app/services/instant-messaging.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

  user$: Observable<User>;
  messages: Message[] = [];

  messageText = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private messagesService: MessagesService,
    private websocketService: InstantMessagingService
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

    this.user$.pipe(
      switchMap(result => {
        const user = result;
        return this.messagesService.getMessagesWithUser({ username: user.username });
      }),
      shareReplay(1)
    ).subscribe(m => {
      this.messages = m;
    });

    this.websocketService.messages().subscribe(m => {
      this.messages.push(m);
    });
  }

  sendMessage() {
    this.user$.pipe(take(1)).subscribe(user => {
      this.websocketService.send({ message: this.messageText }, user.username);
      this.messageText = '';
    });
  }

  trackByFn(m: Message): string {
    return m.id;
  }

  timestamp(index: number): boolean {
    if (index === 0) { return true; }
    return (new Date(this.messages[index].timestamp).getTime() - new Date(this.messages[index - 1].timestamp).getTime()) > 60000;
  }

}
