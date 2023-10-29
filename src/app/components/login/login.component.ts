import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/interfaces/profile.interface';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private router: Router,
    private accountsService: AccountsService
  ) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(9),
      ]),
    });
  }

  onSubmit(form: FormGroup) {
    const user: Partial<Profile> = {
      email: form.value.email,
      password: form.value.password,
    };

    this.accountsService.getAccount(user).subscribe((profile) => {
      profile.filter((user) => {
        if (
          user.email === form.value.email &&
          user.password === form.value.password
        ) {
          this.router.navigateByUrl('/overview');
        } else {
          alert('Please enter a valid account');
        }
      });
    });
  }

  redirect() {
    this.router.navigateByUrl('/register');
  }
}
