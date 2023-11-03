import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Notification } from '../../models/notification.interface';
import { NotificationType } from 'src/app/notifications/models/notification-type.enum';
import { NotificationsService } from 'src/app/notifications/services/notifications.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() data!: Notification;

  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();

  typeEnum = NotificationType;

  constructor(private notificationsService: NotificationsService) {}

  onDeleteClick() {
    this.notificationsService.deleteNotification(this.data.id).subscribe(() => {
      this.onDelete.emit(this.data.id as number);
    });
  }
}
