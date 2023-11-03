import { Component } from '@angular/core';
import { NotificationsService } from 'src/app/notifications/services/notifications.service';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.scss'],
})
export class ProfileModalComponent {
  firstName!: string;
  lastName!: string;
  userEmail!: string;
  userPassword!: string;
  userId!: number | undefined;

  constructor(
    private accountsService: AccountsService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    const user = this.accountsService.user;

    if (user) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.userEmail = user.email;
      this.userPassword = user.password;
    }
    console.log(user);
  }
}
