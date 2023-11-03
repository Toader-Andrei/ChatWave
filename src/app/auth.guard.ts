import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from './services/accounts.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private accountService: AccountsService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.accountService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
