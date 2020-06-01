import { Component, OnInit } from '@angular/core';
import { Post } from '../../generated/models';
import { PostsService } from "../../generated/services/posts.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  postId: string;
  post: Post;

  constructor(private postsService: PostsService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get("postId");
    this.postsService.getPostById({postId: this.postId}).subscribe(post => {
      this.post = post;
    });
  }
}
