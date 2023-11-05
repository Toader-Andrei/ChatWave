import { Component, Output } from '@angular/core';
import { Profile } from 'src/app/models/interfaces/profile.interface';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  users: Profile[] = [];

  constructor(private accountsService: AccountsService) {}

  ngOnInit() {
    const user = this.accountsService.user;

    if (user) {
      this.accountsService.getProfiles().subscribe((res) => {
        this.users = res.filter((actualUser) => {
          return actualUser.id !== user.id;
        });
        console.log(this.users);
      });
    }
  }
}
