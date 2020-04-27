import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PostComponent} from './components/post/post.component';
import {LoginComponent} from './components/login/login.component';
import {ImageComponent} from './components/image/image.component';
import {PostHeaderComponent} from './components/post-header/post-header.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileHeaderComponent} from './components/profile-header/profile-header.component';
import {CommentSectionComponent} from './components/comment-section/comment-section.component';
import {CommentComponent} from './components/comment/comment.component';
import {AuthorCommentComponent} from './components/author-comment/author-comment.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    LoginComponent,
    ImageComponent,
    PostHeaderComponent,
    ProfileComponent,
    ProfileHeaderComponent,
    CommentComponent,
    CommentSectionComponent,
    AuthorCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
