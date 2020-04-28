import {Component, Input, OnInit} from '@angular/core';
import {Post} from 'src/app/generated/models';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']

})
export class ImageComponent implements OnInit {
  @Input() post: Post;

  constructor() {
  }

  ngOnInit(): void {

  }

}
