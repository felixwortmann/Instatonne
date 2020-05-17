import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, EMPTY, BehaviorSubject, combineLatest, timer, Subscription } from 'rxjs';
import { User, Message } from 'src/app/generated/models';
import { ActivatedRoute } from '@angular/router';
import { switchMap, shareReplay, take, first, filter } from 'rxjs/operators';
import { UsersService, MessagesService } from 'src/app/generated/services';
import { RxStomp } from '@stomp/rx-stomp';
import { InstantMessagingService } from 'src/app/services/instant-messaging.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit, OnDestroy {

  user$: Observable<User>;
  messages: Message[] = [];

  messageText = '';

  private subscriptions = new Subscription();

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
          // this does some weird saucery https://github.com/angular/angular/issues/17572#issuecomment-323465737
          // if you remove it angular throws an ExpressionChangedAfterItHasBeenCheckedError which sounds bad enough
          Promise.resolve(null).then(() => this.websocketService.resetUnreadMessageCount(username));
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
      take(1)
    ).subscribe(m => {
      this.messages = m;
      this.messages.forEach(msg => {
        if (!msg.read) {
          this.messagesService.readMessage({ id: msg.id }).pipe(take(1)).subscribe();
        }
      });
    });

    this.user$.pipe(take(1)).subscribe(user => {
      this.subscriptions.add(this.websocketService.messages().pipe(
        filter(m => m.author === user.username || m.receiver === user.username)
      ).subscribe(m => {
        this.messages.push(m);
        this.websocketService.resetUnreadMessageCount(m.author);
        this.messagesService.readMessage({ id: m.id }).subscribe();
      }));
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
