import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccountsService } from 'src/app/services/accounts.service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
})
export class SettingsModalComponent implements OnInit {
  myForm!: FormGroup;

  firstName!: string;
  lastName!: string;
  userEmail!: string;
  userPassword!: string;

  constructor(
    private accountsService: AccountsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      currentPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
      verifyPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
    });
  }
}
