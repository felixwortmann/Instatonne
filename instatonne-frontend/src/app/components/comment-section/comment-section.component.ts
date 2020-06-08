import {Component, Input, OnInit} from '@angular/core';
import {Comment} from 'src/app/generated/models';
import {CommentsService} from "../../generated/services/comments.service";
import {Observable} from "rxjs";
import {ActivatedRoute, RouterEvent} from "@angular/router";

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {
  comments$: Observable<Comment[]>;
  @Input()
  postId: string;

  constructor(private commentsService: CommentsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.postId === null){
      this.postId = this.route.snapshot.paramMap.get("postId");
    }
    this.comments$ = this.commentsService.getPostComments({'postId': this.postId});
    console.log("Comments:");
    console.log(this.comments$);
    console.log("post id:");
    console.log(this.postId);
    this.comments$.subscribe(data => {
      console.log(data);
    })
  }

}
