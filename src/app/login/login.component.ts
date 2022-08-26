import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { LoginService } from '../core/services/login/login.service';
import { Router } from '@angular/router';
import { APPLABELCONSTANTS } from '../config/app-label.constants';
import { LocalStorageService } from '../shared/common/local-storage.service';
import { ToasterService } from '../shared/toaster/toaster.service';

export interface Response {
  status: number;
  token: string;
  userId: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  submitted = false;
  resetForm: FormGroup;
  resetUserFlag: boolean = false;
  readonly APPLABELCONSTANTS = APPLABELCONSTANTS;
  constructor(
    public router: Router,
    public loginService: LoginService,
    public formBuilder: FormBuilder,
    public localStorageService: LocalStorageService,
    public toasterService: ToasterService,
  ) {}

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.signinForm.controls;
  }
  onLogin() {
    let form = {
      userName: this.signinForm.controls['userName'].value.toLowerCase(),
      password: this.signinForm.controls['password'].value
    } 
    this.loginService.login(form).subscribe(
      (resp: any) => {
        if (resp.status == 200) {
          this.setUserData(resp);
          if (resp.data.loggedfirst === 'Y') {
            this.router.navigate(['/changePassword']);
          } else {
            sessionStorage.removeItem('previousUrl');
            this.router.navigate(['/home/myPolicies']);
          }
        } else {
          this.toasterService.showError(resp.message, 'Error');
        }
      },
      (error: any) => {
        this.toasterService.showError(error.error.error, 'Error');
      }
    );
  }
  setUserData(resp) {
    this.localStorageService.setLocalStorage('token', resp.data.token);
    this.localStorageService.setLocalStorage('userId', resp.data.userId);
    this.localStorageService.setLocalStorage(
      'userDetail',
      JSON.stringify(resp.data)
    );
  }

  forgotPassword() {
    if (!this.signinForm.controls['userName'].valid) {
      this.signinForm.get('userName').markAsTouched({ onlySelf: true });
    } else {
      this.resetUserFlag = true;
      this.resetForm = this.formBuilder.group({
        userName: ['', [Validators.required]],
        email: [
          this.signinForm.controls['userName'].value,
          [
            Validators.required,
            Validators.pattern(
              '^[A-Za-z0-9]+(.[_A-Za-z0-9]+)*@[A-Za-z0-9-]+(.[A-Za-z0-9-]+)*(.[A-Za-z]{2,15})$'
            ),
          ],
        ],
      });
    }
  }
  submit() {
    let emailId = this.resetForm.controls['email'].value.toLowerCase();
    this.loginService.onForgotPassWord(emailId).subscribe(
      (res: any) => {
        if (res !== undefined) {
          this.localStorageService.setLocalStorage('resetPasswordToken', res);
          this.toasterService.showSuccess('We have sent you Email. Check your email to reset password', 'Success');
          this.router.navigate(['/resetPassword'])
        } else {
          this.toasterService.showError(res.message, 'Error');
        }
      },
      (error: any) => {
        if(error.statusText === 'Unknown Error'){
          this.toasterService.showError('Error while submitting for forgot password', 'Error');
        } else {
          this.toasterService.showError(error.error, 'Error');
        }
      }
    );
  }
  backToLogin() {
    this.resetUserFlag = false;
  }
}
