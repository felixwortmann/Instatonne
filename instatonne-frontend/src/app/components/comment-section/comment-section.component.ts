import {Component, OnInit} from '@angular/core';
import {Comment} from 'src/app/generated/models';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {
  comments: Comment[];

  constructor() {
  }

  ngOnInit(): void {
    this.comments = [
      {
        author: 'Hendrik',
        created: '2019-01-01',
        comment: 'Krasses Bild am Start123'
      },
      {
        author: 'Hendrik',
        created: '2019-01-01',
        comment: 'Krasses Bild am Start123'
      }
    ];
  }

}
