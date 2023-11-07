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
    this.searchUsers = this.fb.group({
      searchedName: new FormControl(''),
    });

    this.searchFriends('');
  }

  onSubmit() {
    const nameValue = this.searchUsers.value;
    this.searchFriends(nameValue.searchedName);
  }

  searchFriends(searchValue: string) {
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
