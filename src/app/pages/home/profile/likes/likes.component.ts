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
  selector: 'app-likes',
  standalone: true,
  imports: [RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './likes.component.html',
})
export class LikesComponent {
  private postService = inject(PostService);
  private userService = inject(UserService);
  readonly user: WritableSignal<userInterface | null> = this.userService.user;

  likesByUser = computed(() => {
    return (
      this.user() &&
      this.postService
        .posts()
        .filter((post) =>
          post.likes.find((item) => item.user === this.user()?._id)
        )
        .sort((item1, item2) => {
          let date1 =
            item1.likes.find((like) => like.user === this.user()?._id)
              ?.createdAt ?? 0;
          let date2 =
            item2.likes.find((like) => like.user === this.user()?._id)
              ?.createdAt ?? 0;

          return new Date(date2).getTime() - new Date(date1).getTime();
        })
    );
  });
}
