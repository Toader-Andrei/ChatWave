import { Component } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  firstName!: string;
  lastName!: string;
  userEmail!: string;
  userPassword!: string;

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    const user = this.accountsService.user;

    if (user) {
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.userEmail = user.email;
      this.userPassword = user.password;
    }
  }
}
