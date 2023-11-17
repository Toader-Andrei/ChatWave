import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private userUrl = 'http://localhost:3000/users';
  private isLogged = false;

  user!: Profile;

  constructor(private http: HttpClient) {
    this.isLogged = !!localStorage.getItem('user');
  }

  isLoggedIn(): boolean {
    return this.isLogged;
  }

  setIsLogged(): void {
    this.isLogged = true;
  }

  getProfiles(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.userUrl);
  }

  searchProfile(value: string): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.userUrl + '?q=' + value);
  }

  registerAccount(user: Partial<Profile>): Observable<Profile[]> {
    return this.http.post<Profile[]>(this.userUrl, user);
  }

  getAccount(email: string): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.userUrl + '?email=' + email);
  }

  getAccounts(user: number): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.userUrl + '/' + user);
  }

  changeName(
    id: number,
    firstName: Profile,
    lastName: Profile,
    bio: Profile
  ): Observable<Profile> {
    return this.http.patch<Profile>(this.userUrl + '/' + id, {
      firstName: firstName,
      lastName: lastName,
      bio: bio,
    });
  }

  changePassword(id: number, password: Profile): Observable<Profile> {
    return this.http.patch<Profile>(this.userUrl + '/' + id, {
      password: password,
    });
  }

  getBlockedUsersFromLoggedUser(id: number): Observable<Profile> {
    return this.http.get<Profile>(this.userUrl + '/' + id);
  }

  addBlockedUser(id: number, blockedUserIds: number[]): Observable<Profile> {
    return this.http.patch<Profile>(this.userUrl + '/' + id, {
      blockedIds: blockedUserIds,
    });
  }

  addFriendId(id: number, friendIds: number[]): Observable<Profile> {
    return this.http.patch<Profile>(this.userUrl + '/' + id, {
      friendIds: friendIds,
    });
  }
}
