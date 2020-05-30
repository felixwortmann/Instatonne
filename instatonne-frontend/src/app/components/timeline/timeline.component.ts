import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../generated/models/post';
import { UsersService } from '../../generated/services/users.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../generated/services/posts.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(private authService: AuthService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.posts$ = this.postsService.getPosts();
  }


}
