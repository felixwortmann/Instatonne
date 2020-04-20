import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ImageComponent} from './components/image/image.component';
import {PostComponent} from './components/post/post.component';
import {ProfileComponent} from './components/profile/profile.component';


const routes: Routes = [
  {path: 'image', component: ImageComponent},
  {path: 'post', component: PostComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
