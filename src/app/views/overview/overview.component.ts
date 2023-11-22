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
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  loggedUser!: Profile;
  friend!: Profile | null;

  isSameUser!: boolean;
  emailNotFoundValidation!: boolean;
  sendedFriendRequest!: boolean;

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
    this.loggedUser = this.accountsService.user;
  }

  getUserByEmail() {
    const user = this.accountsService.user;

    this.accountsService
      .getAccountByEmail(this.friendRequest.value.inviteViaEmail)
      .pipe(map((response) => response[0]))
      .subscribe((response) => {
        if (response) {
          if (response.email === user.email) {
            this.isSameUser = true;
            this.friend = null;
            this.emailNotFoundValidation = false;
          } else if (response) {
            this.isSameUser = false;
            this.friend = response;
            this.emailNotFoundValidation = false;
          }
          this.sendedFriendRequest = false;
        } else {
          this.emailNotFoundValidation = true;
        }
      });
  }

  addFriend() {
    const user = this.accountsService.user;

    const description = 'You got a friend request.';
    const date = new Date().toLocaleString();

    this.accountsService
      .getAccountByEmail(this.friendRequest.value.inviteViaEmail)
      .subscribe((res) => {
        res[0].friendRequestIds.push(user.id);
        this.accountsService
          .sendFriendRequest(res[0].id, res[0].friendRequestIds)
          .subscribe();
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
            if (res[0].friendRequestIds.includes(this.loggedUser.id)) {
              this.sendedFriendRequest = true;
            }
          });
      });
  }
}
