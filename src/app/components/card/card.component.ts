import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { IconsModule } from '../icons/icons.module';
import { postInterface } from '../../interface/post.interface';
import { LetterUppercasePipe } from '../../pipe/letter.uppercase.pipe';
import { DateLocalePipe } from '../../pipe/date.locale.pipe';
import { LikeService } from '../../services/like.service';
import { likeInterface } from '../../interface/like.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/users.services';
import { PostService } from '../../services/posts.services';
import { RouterModule } from '@angular/router';
import { BookMarkService } from '../../services/bookMark.service';
import { bookMarkInterface } from '../../interface/bookMark.interface';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [IconsModule, LetterUppercasePipe, DateLocalePipe, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
})
export class CardComponent {
  post = input.required<postInterface>();
  private userService = inject(UserService);
  private likeService = inject(LikeService);
  private postService = inject(PostService);
  private bookMarkService = inject(BookMarkService);

  isLiked = computed(() =>
    this.userService.profile() &&
    this.post().likes.find(
      (like) => like.user === this.userService.profile()?._id
    )
      ? true
      : false
  );

  isBookMark = computed(() =>
    this.userService.profile() &&
    this.post().bookMarks.find(
      (bookMark) => bookMark.user === this.userService.profile()?._id
    )
      ? true
      : false
  );

  quantityLike = computed(
    () =>
      this.post() &&
      this.post().likes.reduce((quatity, like) => quatity + (like ? 1 : 0), 0)
  );

  quantityComment = computed(
    () =>
      this.post() &&
      this.post().comments.reduce(
        (quantity, comment) => quantity + (comment ? 1 : 0),
        0
      )
  );

  handleAddOrDeleteLike(id: string | undefined) {
    if (id) {
      this.likeService.addOrDeleteLike(id).subscribe({
        next: (data: likeInterface) => {
          this.postService.handleAddOrDeleteLike(data);
        },
        error: (error: HttpErrorResponse) => {
          console.log('--------------->', error);
        },
      });
    }
  }

  handleAddOrDeleteBookMark(id: string) {
    this.bookMarkService.handleAddOrDeleteBookMark(id).subscribe({
      next: (data: bookMarkInterface) => {
        this.postService.handleAddOrDeleteBookMark(data);
      },
      error: (error: HttpErrorResponse) => {
        console.log('---------------->', error);
      },
    });
  }
}
