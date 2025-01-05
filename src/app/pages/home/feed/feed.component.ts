import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CardSkeletonComponent } from '../../../components/card-skeleton/card-skeleton.component';
import { PostService } from '../../../services/posts.services';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../components/card/card.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CardSkeletonComponent, CommonModule, CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feed.component.html',
})
export class FeedComponent {
  private postService = inject(PostService);
  readonly loading = this.postService.loading.asReadonly();
  readonly posts = this.postService.posts.asReadonly();
}
