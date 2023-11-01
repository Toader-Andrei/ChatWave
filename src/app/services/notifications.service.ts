import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../models/interfaces/profile.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notificationUrl = 'http://localhost:3000/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(userId: number): Observable<Notification> {
    return this.http.get<Notification>(
      this.notificationUrl + '?userId=' + userId
    );
  }

  deleteNotification(
    userId: number,
    notificationId: number
  ): Observable<Notification> {
    return this.http.delete<Notification>(
      this.notificationUrl + '?userId=' + userId + '&id=' + notificationId
    );
  }

  deleteAllNotifications(userId: number): Observable<Notification> {
    return this.http.delete<Notification>(
      this.notificationUrl + '?userId=' + userId
    );
  }
}
