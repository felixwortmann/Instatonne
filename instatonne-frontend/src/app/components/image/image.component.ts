import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/generated/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']

})
export class ImageComponent implements OnInit {
  @Input() post: Post;

  env = environment;

  constructor() {
  }

  ngOnInit(): void {

  }

}
