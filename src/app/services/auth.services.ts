import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environments';
import { authInputInterface, authResponse } from '../interface/user.interface';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string;
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    this.url = environment.endpoint;
  }

  authentication(input: authInputInterface): Observable<authResponse> {
    return this.http.post<authResponse>(`${this.url}/auth/login`, input);
  }

  getAuthorizationToken(): string | null {
    const token = localStorage.getItem('ang_access_token');
    return token;
  }

  isAuthenticated(): boolean {
    const token = this.getAuthorizationToken();
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }

  logout() {
    localStorage.removeItem('ang_access_token');
    this.router.navigate(['/login']);
  }
}
