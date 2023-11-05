import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/interfaces/profile.interface';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  userData!: Profile[];

  addData(user: Profile[]): void {
    this.userData = user;
  }
}
