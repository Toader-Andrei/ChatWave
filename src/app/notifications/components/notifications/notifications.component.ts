import { Component, OnInit } from '@angular/core';
import { Notification } from '../../models/notification.interface';
import { AccountsService } from 'src/app/services/accounts.service';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(
    private accountsService: AccountsService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    const user = this.accountsService.user;

    if (user) {
      this.notificationsService.getNotifications(user.id).subscribe((res) => {
        this.notifications = res;
      });
    }
  }

  onNotificationDelete(id: number) {
    this.notifications = this.notifications.filter((notif) => {
      return notif.id !== id;
    });
  }
}
