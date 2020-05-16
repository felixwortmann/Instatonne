import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Conversation } from 'src/app/generated/models';
import { MessagesService } from 'src/app/generated/services';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  conversations$: Observable<Conversation[]>;

  constructor(
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.conversations$ = this.messagesService.getConversations();
  }

}
