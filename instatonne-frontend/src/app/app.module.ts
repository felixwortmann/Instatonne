import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider, forwardRef, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { LoginComponent } from './components/login/login.component';
import { ImageComponent } from './components/image/image.component';
import { PostHeaderComponent } from './components/post-header/post-header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileHeaderComponent } from './components/profile/profile-header/profile-header.component';
import { ProfileHeaderStatsComponent } from './components/profile/profile-header-stats/profile-header-stats.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './core/ApiInterceptor';
import { ApiModule } from './generated/api.module';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninButtonComponent } from './components/signin-button/signin-button.component';
import { SubscriptionBottomSheetComponent } from './components/subscription-bottom-sheet/subscription-bottom-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ProfileSubscriptionsComponent } from './components/profile/profile-subscriptions/profile-subscriptions.component';
import { ProfileSubscriptionsListItemComponent } from './components/profile/profile-subscriptions-list-item/profile-subscriptions-list-item.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MessagingComponent } from './components/messaging/messaging.component';
import { registerLocaleData } from '@angular/common';
import localeDE from '@angular/common/locales/de';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import {CommentSectionComponent} from "./components/comment-section/comment-section.component";
import {AuthorCommentComponent} from "./components/author-comment/author-comment.component";
import {CommentComponent} from "./components/comment/comment.component";

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

registerLocaleData(localeDE);

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    LoginComponent,
    ImageComponent,
    PostHeaderComponent,
    ProfileComponent,
    ProfileHeaderComponent,
    SigninButtonComponent,
    ProfileHeaderStatsComponent,
    SubscriptionBottomSheetComponent,
    ProfileSubscriptionsComponent,
    ProfileSubscriptionsListItemComponent,
    ProfileEditComponent,
    SearchBarComponent,
    MessagingComponent,
    CommentSectionComponent,
    AuthorCommentComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatGridListModule,
    MatInputModule,
    MatTabsModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: environment.apiUrl }),
    AlifeFileToBase64Module,
  ],
  providers: [
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER,
    { provide: LOCALE_ID, useValue: 'de' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
