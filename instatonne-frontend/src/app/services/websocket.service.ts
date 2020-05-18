import { Injectable } from '@angular/core';
import { RxStomp, RxStompState } from '@stomp/rx-stomp';
import { AuthService } from './auth.service';
import { take, filter, map, switchMap } from 'rxjs/operators';
import { NewMessage, Message } from '../generated/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stomp = new RxStomp();

  constructor(
    private authService: AuthService
  ) {
    authService.getToken().pipe(take(1)).subscribe(token => {
      this.stomp.configure({
        brokerURL: environment.websocketEndpoint,
        connectHeaders: {
          passcode: token
        }
      });
      this.stomp.activate();
    });
  }

  send(message: NewMessage, username: string) {
    this.stomp.publish({
      body: JSON.stringify(message),
      destination: '/app/msg/' + username
    });
  }

  messages(): Observable<Message> {
    return this.stomp.watch('/user/queue/msg').pipe(
      map(m => {
        return JSON.parse(m.body) as Message;
      })
    );
  }

}
