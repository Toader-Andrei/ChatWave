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
    const activeUser = this.accountsService.user;

    if (activeUser) {
      this.accountsService.getAccounts(activeUser.id).subscribe((a) => {
        this.accountsService.getProfiles().subscribe((B) => {
          console.log(B);
        });
      });
    }
  }
}
