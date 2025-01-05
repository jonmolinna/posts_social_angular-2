import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { userInputInterface, userInterface } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string;
  private http = inject(HttpClient);
  profile: WritableSignal<userInterface | null> = signal(null);
  user: WritableSignal<userInterface | null> = signal(null);

  constructor() {
    this.url = environment.endpoint;
  }

  addUser(user: userInputInterface): Observable<userInterface> {
    return this.http.post<userInterface>(`${this.url}/users/register`, user);
  }

  getProfile() {
    this.http.get<userInterface>(`${this.url}/users/profile`).subscribe({
      next: (data: userInterface) => {
        this.profile.set(data);
      },
      error: (error: HttpClient) => {
        console.log('Error', error);
      },
    });
  }

  getUserByUsername(username: string): Observable<userInterface> {
    return this.http.get<userInterface>(`${this.url}/users/user/${username}`);
  }
}
