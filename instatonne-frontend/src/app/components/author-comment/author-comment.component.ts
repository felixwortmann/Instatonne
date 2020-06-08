import {Component, Input, OnInit} from '@angular/core';
import { CommentsService } from "../../generated/services/comments.service";

@Component({
  selector: 'app-author-comment',
  templateUrl: './author-comment.component.html',
  styleUrls: ['./author-comment.component.scss']
})
export class AuthorCommentComponent implements OnInit {
  @Input()
  postId: string;
  comment: string;

  constructor(private commentsService: CommentsService) {
  }

  ngOnInit(): void {
  }

  authorComment() {
    const body = {postId: this.postId, body: {comment: this.comment}};
    this.commentsService.authorComment(body).subscribe();
  }

  save(text){
    this.comment = text;
  }

}
