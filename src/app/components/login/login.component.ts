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
    const credentials = {
      email: form.value.email,
      password: form.value.password,
    };

    this.accountsService.getAccount(credentials.email).subscribe((response) => {
      if (response.length) {
        if (
          response[0].email === form.value.email &&
          response[0].password === form.value.password
        ) {
          this.accountsService.user = response[0];
          this.router.navigateByUrl('/overview');
        }
      }
    });
  }

  redirect() {
    this.router.navigateByUrl('/register');
  }
}
