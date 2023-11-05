import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;

  passwordValidator: boolean = true;

  constructor(
    private router: Router,
    private accountsService: AccountsService
  ) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(9),
      ]),
      remember: new FormControl(false),
    });
  }

  onSubmit() {
    this.passwordValidator = false;

    const credentials = {
      email: this.myForm.value.email,
      password: this.myForm.value.password,
    };

    this.accountsService.getAccount(credentials.email).subscribe((response) => {
      if (response.length) {
        if (
          response[0].email === this.myForm.value.email &&
          response[0].password === this.myForm.value.password
        ) {
          if (response[0].password !== this.myForm.value.password) {
            this.passwordValidator = false;
          } else {
            this.passwordValidator = true;
            if (this.myForm.value.remember) {
              localStorage.setItem('isLogged', 'true');
              this.accountsService.setIsLogged();
            }

            this.accountsService.user = response[0];
            this.router.navigateByUrl('/overview');
          }
        }
      }
    });
  }

  redirect() {
    this.router.navigateByUrl('/register');
  }
}
