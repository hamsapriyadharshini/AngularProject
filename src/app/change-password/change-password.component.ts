import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/common/local-storage.service';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { LoginService } from '../core/services/login/login.service';
import { ToasterService } from '../shared/toaster/toaster.service';
import { APPLABELCONSTANTS } from '../config/app-label.constants';
import { Router } from '@angular/router';
import { PasswordValidator } from '../shared/password.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePassword: FormGroup;
  disableSaveBtn: boolean;
  readonly APPLABELCONSTANTS = APPLABELCONSTANTS;

  error_messages = {
    oldPassword: [{ type: 'required', message: 'Old password required.' }],

    newPassword: [
      { type: 'required', message: 'New password required.' },
      {
        type: 'pattern',
        message: 'Password not valid. Follow the provided guidelines.',
      },
    ],
    confirmPassword: [
      { type: 'required', message: 'Retype your new password.' },
      {
        type: 'pattern',
        message: 'Password not valid. Follow the provided guidelines.',
      },
      { type: 'misMatch', message: 'Passwords do not match.' },
    ],
  };

  pwdMatch: boolean = false;

  constructor(
    public router: Router,
    public localStorageService: LocalStorageService,
    public formBuilder: FormBuilder,
    public loginService: LoginService,
    public toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.initChangePasswordForm();
    let userDetails = sessionStorage.getItem('userDetail')
      ? JSON.parse(sessionStorage.getItem('userDetail'))
      : '';
    if (userDetails) {
      this.changePassword.controls['userName'].setValue(userDetails.userName);
      this.disableSaveBtn = userDetails.forcePwdChange == 'Y' ? false : true;
    }
  }

  initChangePasswordForm() {
    this.changePassword = this.formBuilder.group(
      {
        userName: [''],
        oldPassword: ['', Validators.required],
        newPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*]{12,50}'
            ),
          ]),
        ],
        confirmPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*]{12,50}'
            ),
          ]),
        ],
      },
      { validator: PasswordValidator }
    );
  }

  get c() {
    return this.changePassword.controls;
  }

  onSave() {
    let changePasswordObj = {
      userName: this.changePassword.controls['userName'].value,
      newPassword: this.changePassword.controls['newPassword'].value,
      oldPassword: this.changePassword.controls['oldPassword'].value,
    };
    this.loginService
      .onChangePasword(changePasswordObj)
      .subscribe((res: any) => {
        if (res.status == 200) {
          this.loginService.doLogout().subscribe(
            (res: any) => {
              sessionStorage.clear();
              this.router.navigateByUrl('/login');
            },
            (error: any) => {
              console.log('error', error);
            }
          );
          this.toasterService.showSuccess(
            res.message,
            APPLABELCONSTANTS.TOAST_TITLE.SUCCESS
          );
        } else {
          this.toasterService.showError(
            res.message,
            APPLABELCONSTANTS.TOAST_TITLE.ERROR
          );
        }
      });
  }

  onCancel() {
    this.router.navigate(['dashboard']);
  }
}
