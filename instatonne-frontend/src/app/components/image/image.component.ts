import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/generated/models';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']

})
export class ImageComponent implements OnInit {
  post: Post;

  constructor() {
  }

  ngOnInit(): void {
    this.post = { "imageUrl": "https://via.placeholder.com/1080" }
  }

}
