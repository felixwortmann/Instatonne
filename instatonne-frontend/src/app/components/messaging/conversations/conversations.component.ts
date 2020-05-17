import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Conversation } from 'src/app/generated/models';
import { MessagesService, UsersService } from 'src/app/generated/services';
import { InstantMessagingService } from 'src/app/services/instant-messaging.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  conversations$ = new Subject<Conversation[]>();
  conversationsMap = new Map<string, Conversation>();

  constructor(
    private messagesService: MessagesService,
    private usersService: UsersService,
    private instantMessagingService: InstantMessagingService
  ) { }

  ngOnInit(): void {
    this.messagesService.getConversations().pipe(take(1)).subscribe(convs => {
      convs.forEach(conv => {
        this.conversationsMap.set(conv.withUser.username, conv);
      });
      this.update();
    });

    this.instantMessagingService.messages().subscribe(message => {
      if (this.conversationsMap.has(message.author)) {
        const conv = this.conversationsMap.get(message.author);
        conv.lastMessage = message;
        conv.unreadMessageCount++;
        this.update();
      } else {
        this.usersService.getUserByName({ username: message.author }).pipe(take(1)).subscribe(user => {
          this.conversationsMap.set(user.username, {
            withUser: user,
            lastMessage: message,
            unreadMessageCount: 1
          });
          this.update();
        });
      }
    });
  }

  private update() {
    this.conversations$.next(Array.from(this.conversationsMap.values()).sort((a, b) => {
      return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
    }));
  }

  trackConv(index: number, c: Conversation) {
    return c.withUser.id;
  }

}
