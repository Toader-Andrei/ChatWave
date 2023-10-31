import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private apiUrl = 'http://localhost:3000/users';

  user!: Profile;

  constructor(private http: HttpClient) {}

  registerAccount(user: Profile): Observable<Profile[]> {
    return this.http.post<Profile[]>(this.apiUrl, user);
  }

  getAccount(email: string): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl + '?email=' + email);
  }

  getAccounts(user: number): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl + '/' + user);
  }

  changeName(
    id: number,
    firstName: Profile,
    lastName: Profile,
    bio: Profile
  ): Observable<Profile> {
    return this.http.patch<Profile>(this.apiUrl + '/' + id, {
      firstName: firstName,
      lastName: lastName,
      bio: bio,
    });
  }

  changePassword(id: number, password: Profile): Observable<Profile> {
    return this.http.patch<Profile>(this.apiUrl + '/' + id, {
      password: password,
    });
  }
}
