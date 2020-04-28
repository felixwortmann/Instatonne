import {Component, OnInit} from '@angular/core';
import {Post} from 'src/app/generated/models';
import {Comment} from 'src/app/generated/models';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent implements OnInit {
  post: Post;
  comments: [Comment]

  constructor() {
  }

  ngOnInit(): void {
    this.post = {author: 'My Name'};
    this.post.comments = [
      {
        author: 'Author',
        created: '2019-01-01',
        comment: 'Kommentar'
      }
    ];
  }
}
