import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Notification } from '../../models/notification.interface';
import { NotificationType } from 'src/app/notifications/models/notification-type.enum';
import { NotificationsService } from 'src/app/notifications/services/notifications.service';
import { AccountsService } from 'src/app/services/accounts.service';
import { Profile } from 'src/app/models/interfaces/profile.interface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() data!: Notification;

  loggedUser: Profile;

  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();

  typeEnum = NotificationType;

  constructor(
    private notificationsService: NotificationsService,
    private accountsService: AccountsService
  ) {
    this.loggedUser = this.accountsService.user;
  }

  onDeleteClick() {
    this.notificationsService.deleteNotification(this.data.id).subscribe(() => {
      this.onDelete.emit(this.data.id as number);
    });
  }

  confirmFriendRequest() {
    if (this.loggedUser) {
      this.loggedUser.friendIds.push(this.data.senderId as number);

      const updateRequestIds = this.loggedUser.friendRequestIds.filter(
        (requestId) => {
          return requestId !== this.data.senderId;
        }
      );

      this.accountsService
        .addFriendId(
          this.loggedUser.id,
          this.loggedUser.friendIds,
          updateRequestIds
        )
        .subscribe(() => {
          this.accountsService
            .getAccount(this.data.senderId as number)
            .subscribe((res) => {
              res.friendIds.push(this.loggedUser.id);
              this.accountsService
                .addFriendIdConfirm(this.data.senderId as number, res.friendIds)
                .subscribe();
            });

          this.notificationsService
            .deleteNotification(this.data.id)
            .subscribe(() => {
              this.onDelete.emit(this.data.id as number);
            });
        });
    }
  }
}
