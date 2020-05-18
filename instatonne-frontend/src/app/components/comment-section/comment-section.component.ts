import {Component, OnInit} from '@angular/core';
import {Comment} from 'src/app/generated/models';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.scss']
})
export class CommentSectionComponent implements OnInit {

  @Input() comments: Comment[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
