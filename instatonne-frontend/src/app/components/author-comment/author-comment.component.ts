import {Component, Input, OnInit} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import { CommentsService } from "../../generated/services/comments.service";
import {NewComment } from '../../generated/models';

@Component({
  selector: 'app-author-comment',
  templateUrl: './author-comment.component.html',
  styleUrls: ['./author-comment.component.scss']
})
export class AuthorCommentComponent implements OnInit {
  @Input()
  postUuid: string;
  comment: string;

  constructor(private commentsService: CommentsService) {
  }

  ngOnInit(): void {
  }

  authorComment() {
    const comment = this.comment;
    console.log(comment);
    const body = {postId: "123", body: {comment: comment}};
    this.commentsService.authorComment(body).subscribe();
  }

  save(text){
    this.comment = text;
  }

}
