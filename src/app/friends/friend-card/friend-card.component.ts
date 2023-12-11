import { Component, Input } from '@angular/core';

import { Profile } from 'src/app/models/interfaces/profile.interface';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
})
export class FriendCardComponent {
  @Input() user!: Profile;

  loggedUser: Profile;

  constructor(private accountsService: AccountsService) {
    this.loggedUser = this.accountsService.user;
  }

  blockUser() {
    if (this.loggedUser) {
      this.loggedUser.blockedIds.push(this.user.id);
      this.accountsService
        .addBlockedUser(this.loggedUser.id, this.loggedUser.blockedIds)
        .subscribe();
    }
  }

  unBlockUser() {
    if (this.loggedUser.blockedIds.includes(this.user.id)) {
      const newListAfterUnblock = this.loggedUser.blockedIds.filter((res) => {
        return res !== this.user.id;
      });
      this.loggedUser.blockedIds = newListAfterUnblock;

      this.accountsService
        .addBlockedUser(this.loggedUser.id, newListAfterUnblock)
        .subscribe();
    }
  }

  unFriendUser() {
    if (this.loggedUser.friendIds.includes(this.user.id)) {
      const newListAfterUnfriend = this.loggedUser.friendIds.filter((res) => {
        return res !== this.user.id;
      });
      this.loggedUser.friendIds = newListAfterUnfriend;

      this.accountsService
        .removeFriend(this.loggedUser.id, newListAfterUnfriend)
        .subscribe();

      if (this.user.friendIds.includes(this.loggedUser.id)) {
        const friendNewListAfterUnfriend = this.user.friendIds.filter((res) => {
          return res !== this.loggedUser.id;
        });
        this.user.friendIds = friendNewListAfterUnfriend;

        this.accountsService
          .removeFriend(this.loggedUser.id, friendNewListAfterUnfriend)
          .subscribe();
      }
      this.accountsService
        .getAccount(this.loggedUser.id)
        .subscribe((friendsList) => {
          this.loggedUser.friendIds = friendsList.friendIds;
        });
    }
  }
}
