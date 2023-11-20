import { Component } from '@angular/core';
import { Profile } from 'src/app/models/interfaces/profile.interface';
import { AccountsService } from 'src/app/services/accounts.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  users: Profile[] = [];

  constructor(
    private accountsService: AccountsService,
    private fb: FormBuilder
  ) {}

  searchUsers!: FormGroup;

  ngOnInit() {
    const user = this.accountsService.user;

    this.searchUsers = this.fb.group({
      searchedName: new FormControl(''),
    });

    user.friendIds.forEach((res) => {
      this.searchFriends(res);
    });
  }

  onSubmit() {
    const nameValue = this.searchUsers.value;
    this.searchFriends(nameValue.searchedName);
  }

  searchFriends(searchValue: number) {
    const user = this.accountsService.user;

    if (user) {
      this.accountsService.searchProfile(searchValue).subscribe((res) => {
        this.users = res.filter((actualUser) => {
          return actualUser.id !== user.id;
        });
      });
    }
  }
}
