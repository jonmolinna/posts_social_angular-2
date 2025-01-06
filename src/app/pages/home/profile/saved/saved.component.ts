import { Component, computed, inject, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PostService } from '../../../../services/posts.services';
import { UserService } from '../../../../services/users.services';
import { userInterface } from '../../../../interface/user.interface';

@Component({
  selector: 'app-saved',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './saved.component.html',
})
export class SavedComponent {
  private postService = inject(PostService);
  private userService = inject(UserService);
  readonly user: WritableSignal<userInterface | null> = this.userService.user;

  bookMarksByUser = computed(() => {
    return (
      this.user() &&
      this.postService
        .posts()
        .filter((post) =>
          post.bookMarks.find((item) => item.user === this.user()?._id)
        )
        .sort((item1, item2) => {
          let date1 =
            item1.bookMarks.find((book) => book.user === this.user()?._id)
              ?.createdAt ?? 0;
          let date2 =
            item2.bookMarks.find((book) => book.user === this.user()?._id)
              ?.createdAt ?? 0;

          return new Date(date2).getTime() - new Date(date1).getTime();
        })
    );
  });
}
