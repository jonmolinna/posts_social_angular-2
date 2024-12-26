import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { FeedComponent } from './pages/home/feed/feed.component';
import { UploadComponent } from './pages/home/upload/upload.component';
import { ProfileComponent } from './pages/home/profile/profile.component';
import { PostComponent } from './pages/home/post/post.component';

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
      },
      {
        path: 'p/:id',
        canActivate: [AuthGuard],
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
