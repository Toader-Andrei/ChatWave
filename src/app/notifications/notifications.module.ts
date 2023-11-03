import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationsRoutingModule } from './notifications-routing.module';

@NgModule({
  declarations: [NotificationsComponent, NotificationComponent],
  imports: [CommonModule, NotificationsRoutingModule],
})
export class NotificationsModule {}
