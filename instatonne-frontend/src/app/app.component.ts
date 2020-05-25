import { Component, OnInit } from '@angular/core';
import { InstantMessagingService } from './services/instant-messaging.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'instatonne-frontend';

  newMessages$: Observable<number>;

  constructor(
    private messagingService: InstantMessagingService
  ) { }

  ngOnInit() {
    this.newMessages$ = this.messagingService.getTotalNewMessageCount().pipe(map(n => n === 0 ? null : n));
  }
}
