import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { FeedComponent } from './pages/home/feed/feed.component';
import { UploadComponent } from './pages/home/upload/upload.component';
import { ProfileComponent } from './pages/home/profile/profile.component';
import { PostComponent } from './pages/home/post/post.component';
import { PostsComponent } from './pages/home/profile/posts/posts.component';
import { LikesComponent } from './pages/home/profile/likes/likes.component';
import { SavedComponent } from './pages/home/profile/saved/saved.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: FeedComponent,
      },
      {
        path: 'upload',
        component: UploadComponent,
      },
      {
        path: 'profile/:username',
        component: ProfileComponent,
        children: [
          {
            path: '',
            redirectTo: '',
            pathMatch: 'full',
          },
          {
            path: '',
            component: PostsComponent,
          },
          {
            path: 'likes',
            component: LikesComponent,
          },
          {
            path: 'saved',
            component: SavedComponent,
          },
        ],
      },
      {
        path: 'p/:id',
        component: PostComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
