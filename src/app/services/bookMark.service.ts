import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { bookMarkInterface } from '../interface/bookMark.interface';

@Injectable({
  providedIn: 'root',
})
export class BookMarkService {
  private http = inject(HttpClient);
  private url: string;

  constructor() {
    this.url = environment.endpoint;
  }

  handleAddOrDeleteBookMark(id: string): Observable<bookMarkInterface> {
    return this.http.post<bookMarkInterface>(
      `${this.url}/bookmark/addOrDelete/${id}`,
      {}
    );
  }
}
