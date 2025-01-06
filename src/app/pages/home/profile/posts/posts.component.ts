import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  WritableSignal,
} from '@angular/core';
import { PostService } from '../../../../services/posts.services';
import { UserService } from '../../../../services/users.services';
import { userInterface } from '../../../../interface/user.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './posts.component.html',
})
export class PostsComponent {
  private postService = inject(PostService);
  private userService = inject(UserService);
  readonly user: WritableSignal<userInterface | null> = this.userService.user;

  postsByUser = computed(() => {
    return (
      this.user() &&
      this.postService
        .posts()
        .filter((post) => post.user._id === this.user()?._id)
    );
  });
}
