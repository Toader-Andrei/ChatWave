import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Profile } from '../models/interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private userUrl = 'http://localhost:3000/users';
  private isLogged = false;

  // testSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // updateSubject(data: boolean): void {
  //   this.testSubject$.next(data);
  // }

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

  searchAccount(value: number): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.userUrl + '?q=' + value);
  }

  registerAccount(user: Partial<Profile>): Observable<Profile[]> {
    return this.http.post<Profile[]>(this.userUrl, user);
  }

  getAccountByEmail(email: string): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.userUrl + '?email=' + email);
  }

  getAccount(userId: number): Observable<Profile> {
    return this.http.get<Profile>(this.userUrl + '/' + userId);
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

  addBlockedUser(id: number, blockedUserIds: number[]): Observable<Profile> {
    return this.http.patch<Profile>(this.userUrl + '/' + id, {
      blockedIds: blockedUserIds,
    });
  }

  sendFriendRequest(
    receiverId: number,
    friendRequestIds: number[]
  ): Observable<Profile> {
    return this.http.patch<Profile>(this.userUrl + '/' + receiverId, {
      friendRequestIds,
    });
  }

  addFriendId(
    id: number,
    friendIds: number[],
    friendRequestIds: number[]
  ): Observable<Profile> {
    return this.http.patch<Profile>(this.userUrl + '/' + id, {
      friendIds,
      friendRequestIds,
    });
  }

  addFriendIdConfirm(id: number, friendIds: number[]): Observable<Profile> {
    return this.http.patch<Profile>(this.userUrl + '/' + id, {
      friendIds,
    });
  }
}
