import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private router: Router,
    private accountsService: AccountsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
      remember: new FormControl(false),
    });
  }

  onSubmit() {
    const user = {
      firstName: this.myForm.value.firstName,
      lastName: this.myForm.value.lastName,
      email: this.myForm.value.email,
      password: this.myForm.value.password,
    };

    this.accountsService.registerAccount(user).subscribe(() => {
      if (this.myForm.value.remember) {
        localStorage.setItem('isLogged', 'true');
        this.accountsService.setIsLogged();
      }
      this.router.navigateByUrl('/overview');
    });
  }
}
