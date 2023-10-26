import { Injectable } from '@angular/core';
import { Profile } from '../models/interfaces/Profile.interface';
import { ACCOUNTS } from '../Accounts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  pushAccounts(user: any): Observable<Profile[]> {
    return this.http.post<Profile[]>(this.apiUrl, user);
  }

  getAccounts(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.apiUrl);
  }
}
