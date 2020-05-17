import { Injectable } from '@angular/core';
import { RxStomp, RxStompState } from '@stomp/rx-stomp';
import { AuthService } from './auth.service';
import { take, filter, map, switchMap, tap, share } from 'rxjs/operators';
import { NewMessage, Message, User } from '../generated/models';
import { Observable, ReplaySubject, BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessagesService } from '../generated/services';

@Injectable({
  providedIn: 'root'
})
export class InstantMessagingService {

  private stomp = new RxStomp();

  private newMessage$: Observable<Message>;
  private unreadMessageCountMap = new Map<string, number>();
  private unreadMessageCount$ = new Subject<null>();

  constructor(
    private authService: AuthService,
    private messagesService: MessagesService
  ) {
    this.authService.getToken().pipe(take(1)).subscribe(token => {
      this.stomp.configure({
        brokerURL: environment.websocketEndpoint,
        connectHeaders: {
          passcode: token
        }
      });
      this.stomp.activate();
    });

    this.newMessage$ = this.stomp.watch('/user/queue/msg').pipe(
      map(m => {
        return JSON.parse(m.body) as Message;
      }),
      share()
    );

    this.newMessage$.subscribe(message => {
      const current = this.unreadMessageCountMap.get(message.author) ?? 0;
      this.unreadMessageCountMap.set(message.author, current + 1);
      this.unreadMessageCount$.next();
    });

    this.messagesService.getConversations().pipe(take(1)).subscribe(convs => {
      convs.forEach(conv => {
        this.unreadMessageCountMap.set(conv.withUser.username, conv.unreadMessageCount);
      });
      this.unreadMessageCount$.next();
    });
  }

  send(message: NewMessage, username: string) {
    this.stomp.publish({
      body: JSON.stringify(message),
      destination: '/app/msg/' + username
    });
  }

  messages(): Observable<Message> {
    return this.newMessage$;
  }

  getTotalNewMessageCount(): Observable<number> {
    return this.unreadMessageCount$.pipe(map(_ => {
      return Array.from(this.unreadMessageCountMap.values()).reduce((a, b) => a + b, 0);
    }));
  }

  resetUnreadMessageCount(username: string) {
    this.unreadMessageCountMap.set(username, 0);
    this.unreadMessageCount$.next();
  }

  getNewMessageCountFromUser(user: User): Observable<number> {
    return this.unreadMessageCount$.pipe(map(_ => {
      return this.unreadMessageCountMap.get(user.username) ?? 0;
    }));
  }
}
