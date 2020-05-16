import { Injectable } from '@angular/core';
import { RxStomp, RxStompState } from '@stomp/rx-stomp';
import { AuthService } from './auth.service';
import { take, filter, map, switchMap, tap, share } from 'rxjs/operators';
import { NewMessage, Message, User } from '../generated/models';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstantMessagingService {

  private stomp = new RxStomp();

  private newMessage$: Observable<Message>;
  private unreadMessageCountMap = new Map<string, number>();

  constructor(
    private authService: AuthService
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
    return this.newMessage$.pipe(map(_ => {
      return Array.from(this.unreadMessageCountMap.values()).reduce((a, b) => a + b, 0);
    }));
  }

  getNewMessageCountFromUser(user: User): Observable<number> {
    return this.newMessage$.pipe(map(_ => {
      return this.unreadMessageCountMap.get(user.username) ?? 0;
    }));
  }
}
