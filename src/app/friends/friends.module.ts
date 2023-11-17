import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from './friends/friends.component';
import { FriendCardComponent } from './friend-card/friend-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FriendsRoutingModule } from './friends-routing.module';

@NgModule({
  declarations: [FriendsComponent, FriendCardComponent],
  imports: [CommonModule, ReactiveFormsModule, FriendsRoutingModule],
})
export class FriendsModule {}
