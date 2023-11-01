import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/interfaces/profile.interface';
import { Notification } from '../models/interfaces/notification.interface';
import { NotificationType } from '../models/interfaces/notifcation-type.enum';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private userUrl = 'http://localhost:3000/users';
  private notificationUrl = 'http://localhost:3000/notifications';

  user!: Profile;
  notification!: Notification;

  constructor(private http: HttpClient) {}

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

  createNotification(
    description: string,
    userId: number,
    date: string,
    type: NotificationType
  ): Observable<Notification> {
    return this.http.post<Notification>(this.notificationUrl, {
      description: description,
      userId: userId,
      date: date,
      type: type,
    });
  }
}
