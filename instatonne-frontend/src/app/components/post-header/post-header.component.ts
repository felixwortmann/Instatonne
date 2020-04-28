import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/generated/models';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent implements OnInit {
  post: Post;
  constructor() { }
  ngOnInit(): void {
    this.post = { author: 'My Name' };
  }
}
