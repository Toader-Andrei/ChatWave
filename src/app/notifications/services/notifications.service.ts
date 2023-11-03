import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.interface';
import { NotificationType } from '../models/notification-type.enum';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private apiUrl = 'http://localhost:3000/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl + '?userId=' + userId);
  }

  createNotification(
    description: string,
    userId: number,
    date: string,
    type: NotificationType
  ): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, {
      description: description,
      userId: userId,
      date: date,
      type: type,
    });
  }

  deleteNotification(notificationId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + notificationId);
  }
}
