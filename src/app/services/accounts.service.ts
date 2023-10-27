import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  registerAccount(user: Profile): Observable<Profile[]> {
    return this.http.post<Profile[]>(this.apiUrl, user);
  }

  getAccount(user: Partial<Profile>): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl + '?email=' + user.email);
  }
}
