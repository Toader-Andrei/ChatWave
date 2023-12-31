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

  getNotifications(receiverId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl + '?userId=' + receiverId);
  }

  createFriendRequest(
    description: string,
    senderId: number,
    date: string,
    type: NotificationType,
    firstName: string,
    lastName: string,
    userId: number
  ): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, {
      description: description,
      senderId: userId,
      date: date,
      type: type,
      firstName: firstName,
      lastName: lastName,
      userId: senderId,
    });
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

  addConfirmFriendNotification(
    description: string,
    receiverId: number,
    senderId: number,
    date: string,
    type: NotificationType
  ): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, {
      description,
      userId: receiverId,
      senderId,
      date,
      type,
    });
  }

  addConfirmFriendNotificationForSenderId(
    description: string,
    senderId: number,
    date: string,
    type: NotificationType
  ): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, {
      description,
      userId: senderId,
      date,
      type,
    });
  }

  deleteNotification(notificationId: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + notificationId);
  }
}
