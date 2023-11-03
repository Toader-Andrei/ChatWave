import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { NotificationsService } from 'src/app/notifications/services/notifications.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent {
  constructor(
    private accountsService: AccountsService,
    private notificationsService: NotificationsService
  ) {}

  getNotification() {
    const user = this.accountsService.user;

    if (user) {
      this.notificationsService.getNotifications(user.id).subscribe();
    }
  }
}
