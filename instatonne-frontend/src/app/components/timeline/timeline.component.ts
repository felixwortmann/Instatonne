import {Component, OnInit} from '@angular/core';
import {EMPTY, Observable, ReplaySubject} from 'rxjs';
import {User} from '../../generated/models/user';
import {Post} from '../../generated/models/post';
import {switchMap} from 'rxjs/operators';
import {UsersService} from '../../generated/services/users.service';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PostsService} from '../../generated/services/posts.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  user$ = new ReplaySubject<User>(1);
  posts$: Observable<Post[]>;

  constructor(private authService: AuthService,
              private usersService: UsersService,
              private activatedRoute: ActivatedRoute,
              private postsService: PostsService,
              private router: Router) {
  }

  ngOnInit(): void {
    // console.log('init');
    // this.activatedRoute.paramMap.pipe(switchMap(x => {
    //   const username = x.get('username');
    //   if (username === null) {
    //     this.authService.getUser().subscribe(user => {
    //       this.router.navigate(['/timeline']);
    //     }, _ => {
    //       // if the current user cannot be retrieved, then the user
    //       // probably needs to register first. redirect to login page
    //       this.router.navigate(['/login']);
    //     });
    //     return EMPTY;
    //   } else {
    //     return this.usersService.getUserByName({username});
    //   }
    // })).subscribe(this.user$);
    // this.posts$ = this.user$.pipe(switchMap(user => {
    //   return this.postsService.getPosts();
    // }));
    this.posts$ = this.postsService.getPosts();
    // this.posts$.subscribe((a) => console.log('posts' + a));
  }

}
