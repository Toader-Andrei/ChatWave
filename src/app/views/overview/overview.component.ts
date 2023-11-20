import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/interfaces/profile.interface';
import { NotificationType } from 'src/app/notifications/models/notification-type.enum';
import { NotificationsService } from 'src/app/notifications/services/notifications.service';
import { AccountsService } from 'src/app/services/accounts.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  userData!: Profile[];
  friend!: Profile[];

  isSameUser!: boolean;

  friendRequest!: FormGroup;

  constructor(
    private accountsService: AccountsService,
    private notificationsService: NotificationsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.friendRequest = this.fb.group({
      inviteViaEmail: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    });
  }

  addData(user: Profile[]): void {
    this.userData = user;
  }

  getUserByEmail() {
    const user = this.accountsService.user;

    this.accountsService
      .getAccount(this.friendRequest.value.inviteViaEmail)
      .subscribe((response) => {
        if (response[0].email === user.email) {
          this.isSameUser = true;
          this.friend = [];
        } else {
          this.isSameUser = false;
          this.friend = response;
        }
      });
  }

  addFriend() {
    const user = this.accountsService.user;

    const description = 'You got a friend request.';
    const date = new Date().toLocaleString();

    this.accountsService
      .getAccount(this.friendRequest.value.inviteViaEmail)
      .subscribe((res) => {
        console.log(res[0].id);
        console.log(user.id);

        this.notificationsService
          .createFriendRequest(
            description,
            res[0].id,
            date,
            NotificationType.FriendRequest,
            user.firstName,
            user.lastName,
            user.id
          )
          .subscribe(() => {
            this.friend = [];
          });
      });
  }
}
