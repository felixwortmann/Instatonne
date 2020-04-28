import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider, forwardRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { LoginComponent } from './components/login/login.component';
import { ImageComponent } from './components/image/image.component';
import { PostHeaderComponent } from './components/post-header/post-header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './core/ApiInterceptor';
import { ApiModule } from './generated/api.module';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { SigninButtonComponent } from './components/signin-button/signin-button.component';
import { ProfileHeaderStatsComponent } from './components/profile-header-stats/profile-header-stats.component';

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    LoginComponent,
    ImageComponent,
    PostHeaderComponent,
    ProfileComponent,
    ProfileHeaderComponent,
    SigninButtonComponent,
    ProfileHeaderStatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatInputModule,
    HttpClientModule,
    ApiModule.forRoot({ rootUrl: environment.apiUrl }),
  ],
  providers: [
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
