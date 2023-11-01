import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  ngOnInit(): void {}
}
