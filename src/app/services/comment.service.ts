import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { commentInterface } from '../interface/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private http = inject(HttpClient);
  private url: string;

  constructor() {
    this.url = environment.endpoint;
  }

  addCommentToPost(
    idPost: string,
    comment: string
  ): Observable<commentInterface> {
    return this.http.post<commentInterface>(
      `${this.url}/comment/addComment/${idPost}`,
      comment
    );
  }

  deleteComment(
    idPost: string,
    idComment: string
  ): Observable<commentInterface> {
    return this.http.delete<commentInterface>(
      `${this.url}/comment/deleteComment/${idPost}/${idComment}`
    );
  }
}
