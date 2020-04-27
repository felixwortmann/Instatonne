import {Component, OnInit} from '@angular/core';
import {Comment} from 'src/app/generated/models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  comment: Comment

  constructor() {
  }

  ngOnInit(): void {
    this.comment = {
      author: 'Hendrik',
      created: '2019-01-01 :: 9:03:66',
      comment: 'Krasses Bild am Start'
    };
  }

}
