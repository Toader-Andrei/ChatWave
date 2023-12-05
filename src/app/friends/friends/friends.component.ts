import { Component } from '@angular/core';
import { Profile } from 'src/app/models/interfaces/profile.interface';
import { AccountsService } from 'src/app/services/accounts.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
})
export class FriendsComponent {
  users: Profile[] = [];
  subscription = new Subscription();

  constructor(
    private accountsService: AccountsService,
    private fb: FormBuilder
  ) {}

  searchUsers!: FormGroup;

  ngOnInit() {
    const user = this.accountsService.user;

    // this.subscription = this.accountsService.testSubject$.subscribe((res) => {
    //   console.log(res);
    // });

    this.accountsService.getAccount(user.id).subscribe((res) => {
      res.friendIds.forEach((friendId) => {
        const httpRequest = this.accountsService.getAccount(friendId);
        httpStack.push(httpRequest);
      });

      combineLatest(httpStack).subscribe((response) => {
        this.users = response;
      });
    });

    const httpStack: Observable<Profile>[] = [];

    this.searchUsers = this.fb.group({
      searchedName: new FormControl(''),
    });
  }

  onSubmit() {
    const nameValue = this.searchUsers.value;
    this.searchFriends(nameValue.searchedName);
  }

  searchFriends(searchValue: number) {
    const user = this.accountsService.user;
    if (user) {
      this.accountsService.getAccount(user.id).subscribe((response) => {
        this.accountsService.searchAccount(searchValue).subscribe((res) => {
          this.users = res.filter((actualUser) => {
            return (
              actualUser.id !== user.id &&
              response.friendIds.includes(actualUser.id)
            );
          });
        });
      });
    }
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
