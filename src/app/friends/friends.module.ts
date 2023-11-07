import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends/friends.component';
import { FriendCardComponent } from './friend-card/friend-card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FriendsComponent, FriendCardComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class FriendsModule {}
