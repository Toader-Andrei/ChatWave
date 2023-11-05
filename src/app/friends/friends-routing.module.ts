import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendCardComponent } from './friend-card/friend-card.component';

const routes: Routes = [
  {
    path: '',
    component: FriendCardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FriendsRoutingModule {}
