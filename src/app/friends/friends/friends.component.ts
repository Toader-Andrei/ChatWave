import { Component } from '@angular/core';
import { Profile } from 'src/app/models/interfaces/profile.interface';
import { AccountsService } from 'src/app/services/accounts.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';

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

    const httpStack: Observable<Profile>[] = [];

    this.searchUsers = this.fb.group({
      searchedName: new FormControl(''),
    });

    user.friendIds.forEach((friendId) => {
      const httpRequest = this.accountsService.getAccount(friendId);
      httpStack.push(httpRequest);
    });

    combineLatest(httpStack).subscribe((res) => {
      this.users = res;
    });
  }

  onSubmit() {
    const nameValue = this.searchUsers.value;
    this.searchFriends(nameValue.searchedName);
  }

  searchFriends(searchValue: number) {
    const user = this.accountsService.user;

    if (user) {
      this.accountsService.searchAccount(searchValue).subscribe((res) => {
        this.users = res.filter((actualUser) => {
          return (
            actualUser.id !== user.id && user.friendIds.includes(actualUser.id)
          );
        });
      });
    }
  }
}
