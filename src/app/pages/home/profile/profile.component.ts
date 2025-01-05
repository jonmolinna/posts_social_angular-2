import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { TabsComponent } from '../../../components/tabs/tabs.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/users.services';
import { LetterUppercasePipe } from '../../../pipe/letter.uppercase.pipe';
import { userInterface } from '../../../interface/user.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { PostService } from '../../../services/posts.services';
import { postInterface } from '../../../interface/post.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TabsComponent, RouterModule, LetterUppercasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  private postService = inject(PostService);

  username: WritableSignal<string> = signal('');
  posts: WritableSignal<postInterface[]> = signal([]);
  user: WritableSignal<userInterface | null> = this.userService.user;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) =>
      this.username.set(params['username'])
    );

    this.posts.set(this.postService.posts());

    effect(() => {
      this.handleGetUserByUsername(this.username());
    });
  }

  handleGetUserByUsername(username: string): void {
    this.userService.getUserByUsername(username).subscribe({
      next: (data: userInterface) => {
        this.userService.user.set(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log('--------------> error', error);
        if (error.status === 404) {
          this.router.navigate(['']);
        }
      },
    });
  }

  quantityPostsByUser = computed(() => {
    return (
      this.user() &&
      this.postService
        .posts()
        .reduce(
          (quantity, post) =>
            quantity + (post.user._id === this.user()?._id ? 1 : 0),
          0
        )
    );
  });

  quantityLikesByPosts = computed(
    () =>
      this.user() &&
      this.postService
        .posts()
        .reduce(
          (quantity, post) =>
            quantity +
            (post.likes.find((item) => item.user === this.user()?._id) ? 1 : 0),
          0
        )
  );

  quantityBookMarkPosts = computed(
    () =>
      this.user() &&
      this.postService
        .posts()
        .reduce(
          (quantity, post) =>
            quantity +
            (post.bookMarks.find((item) => item.user === this.user()?._id)
              ? 1
              : 0),
          0
        )
  );
}
