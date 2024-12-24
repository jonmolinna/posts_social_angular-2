import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  Input,
  OnInit,
  Signal,
  signal,
  WritableSignal,
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

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [IconsModule, LetterUppercasePipe, DateLocalePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card.component.html',
})
export class CardComponent {
  post = input.required<postInterface>();
  private userService = inject(UserService);
  private likeService = inject(LikeService);
  private postService = inject(PostService);

  isLiked = computed(() =>
    this.userService.profile() &&
    this.post().likes.find(
      (like) => like.user === this.userService.profile()?._id
    )
      ? true
      : false
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
}
