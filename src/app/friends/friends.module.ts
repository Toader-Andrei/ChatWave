import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends/friends.component';
import { FriendCardComponent } from './friend-card/friend-card.component';



@NgModule({
  declarations: [
    FriendsComponent,
    FriendCardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FriendsModule { }
