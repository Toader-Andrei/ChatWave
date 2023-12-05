import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NotificationType } from 'src/app/notifications/models/notification-type.enum';
import { AccountsService } from 'src/app/services/accounts.service';
import { NotificationsService } from 'src/app/notifications/services/notifications.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  myForm!: FormGroup;
  profileForm!: FormGroup;

  firstName!: string;
  lastName!: string;
  userEmail!: string;
  userPassword!: string;

  constructor(
    private accountsService: AccountsService,
    private notificationsService: NotificationsService,
    private fb: FormBuilder,
    private profile: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.accountsService.user;
    if (user) {
      this.accountsService.getAccount(user.id).subscribe((res) => {
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.userEmail = res.email;
        this.userPassword = res.password;

        this.profileForm.patchValue({
          firstName: this.firstName,
          lastName: this.lastName,
        });
      });
    }

    this.profileForm = this.profile.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      bio: new FormControl(''),
    });

    this.myForm = this.fb.group({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
      ]),
    });

    this.profileForm.patchValue({
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }

  // testSubjectClick() {
  //   this.accountsService.updateSubject(true);
  //   console.log(this.accountsService.testSubject$.getValue());
  //   // asa am acces la datele statice un plus pentru behaviorSubject
  // }

  onChangeProfile(form: FormGroup) {
    const user = this.accountsService.user;

    if (user) {
      this.accountsService
        .changeName(
          user.id as number,
          form.value.firstName,
          form.value.lastName,
          form.value.bio
        )
        .subscribe((response) => {
          response.firstName = form.value.firstName;
          response.lastName = form.value.lastName;
          response = form.value.bio;

          this.toastr.success('You have successfully changed your profile.');

          this.profileForm.patchValue({
            firstName: form.value.firstName,
            lastName: form.value.lastName,
          });

          this.firstName = form.value.firstName;
          this.lastName = form.value.lastName;

          const date = new Date().toLocaleString();

          const description = 'You have successfully changed your profile.';
          this.notificationsService
            .createNotification(
              description,
              user.id,
              date,
              NotificationType.ProfileChange
            )
            .subscribe();
        });
    }
  }

  onChangePassword(form: FormGroup) {
    const user = this.accountsService.user;

    if (user) {
      this.accountsService
        .changePassword(user.id as number, form.value.newPassword)
        .subscribe((response) => {
          response.password = form.value.newPassword;

          console.log(response);

          form.reset();
          this.toastr.success('You have successfully changed your password.');

          const date = new Date().toLocaleString();

          const description = 'You have successfully changed your password.';
          this.notificationsService
            .createNotification(
              description,
              user.id,
              date,
              NotificationType.PasswordChange
            )
            .subscribe();
        });
    }
  }

  logoutClick() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}
