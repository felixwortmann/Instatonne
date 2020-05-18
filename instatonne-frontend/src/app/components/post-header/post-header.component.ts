import {Component, Input, OnInit} from '@angular/core';
import {Post, User} from 'src/app/generated/models';
import {UsersService} from '../../generated/services/users.service';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {Comment} from 'src/app/generated/models';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.scss']
})
export class PostHeaderComponent implements OnInit {
  @Input() post: Post;
  author$: Observable<User>;
  constructor(
    private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.author$ = this.usersService.getUserByName({username: this.post.author});
  }
}
