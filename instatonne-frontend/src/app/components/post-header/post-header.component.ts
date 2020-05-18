import {Component, Input, OnInit} from '@angular/core';
import {Post} from 'src/app/generated/models';
import {UsersService} from '../../generated/services/users.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {Comment} from 'src/app/generated/models';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent implements OnInit {
  @Input() post: Post;
  constructor(
  ) {
  }

  ngOnInit(): void {
  }
}
