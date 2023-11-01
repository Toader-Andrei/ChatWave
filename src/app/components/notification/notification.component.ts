import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  notification!: any;

  constructor(
    private accountsService: AccountsService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    const user = this.accountsService.user;

    if (user) {
      this.notificationsService.getNotifications(user.id).subscribe((res) => {
        this.notification = res;
      });
    }
  }

  deleteNotification() {
    const user = this.accountsService.user;
  }

  deleteAllNotifications() {
    const user = this.accountsService.user;

    if (user) {
      this.notificationsService
        .deleteAllNotifications(user.id)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
