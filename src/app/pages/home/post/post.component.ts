import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PostService } from '../../../services/posts.services';
import { postInterface } from '../../../interface/post.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { IconsModule } from '../../../components/icons/icons.module';
import { LetterUppercasePipe } from '../../../pipe/letter.uppercase.pipe';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/users.services';
import { LikeService } from '../../../services/like.service';
import { likeInterface } from '../../../interface/like.interface';
import { bookMarkInterface } from '../../../interface/bookMark.interface';
import { BookMarkService } from '../../../services/bookMark.service';
import { DateLocalePipe } from '../../../pipe/date.locale.pipe';
import { CommentService } from '../../../services/comment.service';
import { commentInterface } from '../../../interface/comment.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    RouterModule,
    IconsModule,
    LetterUppercasePipe,
    CommonModule,
    DateLocalePipe,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {
  private postService = inject(PostService);
  private userService = inject(UserService);
  private likeService = inject(LikeService);
  private bookMarkService = inject(BookMarkService);
  private commentService = inject(CommentService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private postId: WritableSignal<string> = signal('');
  post: WritableSignal<postInterface | null> = signal(null);
  hidden: WritableSignal<boolean> = signal(true);
  initialForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    const postId = this.route.snapshot.paramMap.get('id');
    postId && this.postId.set(postId);

    this.initialForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    if (this.postId()) {
      this.postService.getOnePostById(this.postId()).subscribe({
        next: (data: postInterface) => {
          this.post.set(data);
        },
        error: (error: HttpErrorResponse) => {
          console.log('---------> error', error);
          if (error.status === 400) {
            this.router.navigate(['']);
          }
          if (error.status === 404) {
            this.router.navigate(['']);
          }
        },
      });
    }
  }

  toggleClasses() {
    this.userService.profile()?._id === this.post()?.user._id
      ? this.hidden.set(!this.hidden())
      : this.hidden.set(true);
  }

  handleDeletePost(id: string | undefined) {
    if (id) {
      this.postService.handleDeletePostUserById(id).subscribe({
        next: (id: string) => {
          this.postService.deletePostById(id);
          this.router.navigate(['']);
        },
        error: (error: HttpErrorResponse) => {
          console.log('------------> ERROR', error);
        },
      });

      this.hidden.set(true);
    }
  }

  isLiked = computed(
    () =>
      this.userService.profile() &&
      this.post() &&
      this.postService
        .posts()
        .find((post) => post._id === this.post()?._id)
        ?.likes.find((like) => like.user === this.userService.profile()?._id)
  );

  isBookMark = computed(
    () =>
      this.userService.profile() &&
      this.post() &&
      this.postService
        .posts()
        .find((post) => post._id === this.post()?._id)
        ?.bookMarks.find(
          (bookMark) => bookMark.user === this.userService.profile()?._id
        )
  );

  quantityLike = computed(
    () =>
      (this.userService.profile() &&
        this.post() &&
        this.postService
          .posts()
          .find((post) => post._id === this.post()?._id)
          ?.likes.reduce((quantity, like) => quantity + (like ? 1 : 0), 0)) ||
      0
  );

  profileId = computed(() => this.userService.profile()?._id);

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

  handleAddOrDeleteBookMark(id: string | undefined) {
    if (id) {
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

  handleDeleteCommentByPostId(idPost: string | undefined, idComment: string) {
    if (idPost && idComment) {
      this.commentService.deleteComment(idPost, idComment).subscribe({
        next: (data: commentInterface) => {
          this.postService.deleteCommentToPostId(data);
          this.post.update((post) =>
            post?.comments.find((comment) => comment._id === data._id)
              ? {
                  ...post,
                  comments: post.comments.filter(
                    (comment) => comment._id !== data._id
                  ),
                }
              : post
          );
        },
        error: (error: HttpErrorResponse) => {
          console.log('----------------------->', error);
        },
      });
    }
  }

  handleAddComment(event: Event, id: string | undefined) {
    event.preventDefault();
    const form = this.initialForm.value;

    if (id) {
      this.commentService.addCommentToPost(id, form).subscribe({
        next: (data: commentInterface) => {
          this.postService.handleAddComment(data);
          this.post.update((post) =>
            post?._id === data.post
              ? { ...post, comments: [...post.comments, data] }
              : post
          );
        },
        error: (error: HttpErrorResponse) => {
          console.log('----------------->', error);
        },
      });
    }

    this.initialForm.reset();
  }
}
