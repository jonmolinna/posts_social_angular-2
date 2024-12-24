import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environments';
import { postInterface } from '../interface/post.interface';
import { likeInterface } from '../interface/like.interface';

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
}
