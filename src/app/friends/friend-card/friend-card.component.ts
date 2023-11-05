import { Component, Input } from '@angular/core';
import { Profile } from 'src/app/models/interfaces/profile.interface';

@Component({
  selector: 'app-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.scss'],
})
export class FriendCardComponent {
  @Input() users!: Profile[];

  ngOnInit() {
    console.log(this.users);
  }
}
