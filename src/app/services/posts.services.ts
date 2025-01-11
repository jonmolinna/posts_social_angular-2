import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environments';
import { postInterface } from '../interface/post.interface';
import { likeInterface } from '../interface/like.interface';
import { bookMarkInterface } from '../interface/bookMark.interface';
import { commentInterface } from '../interface/comment.interface';
import { Observable } from 'rxjs';
import { LikeService } from './like.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private http = inject(HttpClient);
  private url: string;
  readonly loading: WritableSignal<boolean> = signal(false);
  readonly posts: WritableSignal<postInterface[]> = signal([]);

  constructor() {
    this.url = environment.endpoint;
  }

  getAllPosts(): void {
    this.loading.set(true);
    this.http.get<postInterface[]>(`${this.url}/posts/posts`).subscribe({
      next: (posts: postInterface[]) => {
        this.loading.set(false);
        this.posts.set(posts);
      },
      error: (error: HttpErrorResponse) => {
        this.loading.set(false);
        console.log('------------------->', error);
      },
    });
  }

  handleAddPost(formData: FormData): Observable<postInterface> {
    return this.http.post<postInterface>(`${this.url}/posts/upload`, formData);
  }

  getOnePostById(id: string): Observable<postInterface> {
    return this.http.get<postInterface>(`${this.url}/posts/${id}`);
  }

  addPost(post: postInterface) {
    this.posts.update((posts) => [post, ...posts]);
  }

  handleAddOrDeleteLike(payload: likeInterface) {
    this.posts.update((posts) =>
      posts.map((post) =>
        post._id === payload.post
          ? {
              ...post,
              likes: post.likes.find(
                (like) =>
                  like.post === payload.post && like.user === payload.user
              )
                ? post.likes.filter(
                    (like) =>
                      like.post === payload.post && like.user !== payload.user
                  )
                : [...post.likes, payload],
            }
          : post
      )
    );
  }

  handleAddOrDeleteBookMark(payload: bookMarkInterface) {
    this.posts.update((posts) =>
      posts.map((post) =>
        post._id === payload.post
          ? {
              ...post,
              bookMarks: post.bookMarks.find(
                (bookMark) =>
                  bookMark.post === payload.post &&
                  bookMark.user === payload.user
              )
                ? post.bookMarks.filter(
                    (bookMark) =>
                      bookMark.post === payload.post &&
                      bookMark.user !== payload.user
                  )
                : [...post.bookMarks, payload],
            }
          : post
      )
    );
  }

  handleAddComment(payload: commentInterface) {
    this.posts.update((posts) =>
      posts.map((post) =>
        post._id === payload.post
          ? { ...post, comments: [...post.comments, payload] }
          : post
      )
    );
  }

  handleDeletePostUserById(id: string): Observable<string> {
    return this.http.delete<string>(`${this.url}/posts/${id}`);
  }

  deletePostById(payload: string): void {
    this.posts.update((posts) => posts.filter((post) => post._id !== payload));
  }

  deleteCommentToPostId(payload: commentInterface): void {
    this.posts.update((posts) =>
      posts.map((post) =>
        post._id === payload.post
          ? {
              ...post,
              comments: post.comments.find(
                (comment) =>
                  comment._id === payload._id &&
                  comment.user._id === payload.user._id
              )
                ? post.comments.filter((comment) => comment._id !== payload._id)
                : post.comments,
            }
          : post
      )
    );
  }
}
