import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ImageComponent } from './components/image/image.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileSubscriptionsComponent } from './components/profile/profile-subscriptions/profile-subscriptions.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { CreateComponent } from './components/create/create.component';


const routes: Routes = [
  { path: 'image', component: ImageComponent },
  { path: 'post', component: PostComponent },
  { path: 'u', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'u/:username', component: ProfileComponent },
  { path: 'u/:username/f', component: ProfileSubscriptionsComponent },
  { path: 'editProfile', component: ProfileEditComponent },
  { path: 'create', component: CreateComponent }
];

@NgModule({
  imports: [HttpClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
