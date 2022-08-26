import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { LoginService } from '../core/services/login/login.service';
import { Router,ActivatedRoute } from '@angular/router';
import { APPLABELCONSTANTS } from '../config/app-label.constants';
import { LocalStorageService } from '../shared/common/local-storage.service';
import { ToasterService } from '../shared/toaster/toaster.service';
import { PasswordValidator } from '../shared/password.validator';

export interface Response {
  status: number;
  token: string;
  userId: string;
}

@Component({
  selector: 'app-change-confirm-password',
  templateUrl: './change-confirm-password.component.html',
  styleUrls: ['./change-confirm-password.component.scss']
})
export class ChangeConfirmPasswordComponent implements OnInit {
  confirmPasswordForm: FormGroup;
  submitted = false;
  error_messages = { 
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

  readonly APPLABELCONSTANTS = APPLABELCONSTANTS;
  resetPswdOtpForm: FormGroup;
  timeLeft: number = 120;
  interval;
  showTimer: boolean;
  otpExpired: boolean;
  token: string;
  resetUserFlag: boolean = false;
  constructor(
    public router: Router,
    public loginService: LoginService,
    public formBuilder: FormBuilder,
    public localStorageService: LocalStorageService,
    public toasterService: ToasterService,
    public activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.initOtpValidationForms();    
    this.initChangePasswordForm();
    this.token = this.localStorageService.getLocalStorage('resetPasswordToken');
  }
  initOtpValidationForms() {
    this.resetPswdOtpForm = this.formBuilder.group({
      mobileOtp: ['', Validators.required],
    });
    this.setTimer();
    this.timeLeft = 120; 
  }
  setTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.showTimer = true;
        this.otpExpired = false;
        this.timeLeft--;
      } else if (this.timeLeft === 0) {
        this.showTimer = false;
        this.otpExpired = true;
        clearInterval(this.interval);
      }
    }, 1000);
  }

  validateOtp() {
    let otp = this.resetPswdOtpForm.controls['mobileOtp'].value;
    let resetPasswordToken = this.token;
    this.loginService.validateOtp(otp,resetPasswordToken).subscribe(
      (res: any) => {
        if (res) {
          this.resetUserFlag = true;
        }
      },
      (error: any) => {
        this.toasterService.showError(error.error, 'Error');
      }
    );
  }
  resendOtp() {   
      this.loginService.confirmPasswordReset(this.token).subscribe(
        (res: any) => {
          if(res != undefined) {
          this.toasterService.showSuccess('OTP Sent Successfully', 'Success');
          this.setTimer();
          this.timeLeft = 120;    
          }    
        },
        (error: any) => {
          if(error.status == 200) {
            this.toasterService.showSuccess('OTP Sent Successfully', 'Success');     
            this.setTimer();
            this.timeLeft = 120; 
          } else {
          this.toasterService.showError('Error While Getting OTP', 'Error');
          }
        }
      );
  }
 
  initChangePasswordForm() {
    this.confirmPasswordForm = this.formBuilder.group(
      {
        userName: ['', Validators.required],
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
  // convenience getter for easy access to form fields
  get f() {
    return this.confirmPasswordForm.controls;
  }

  submit() {
    let params = {
      password: this.confirmPasswordForm.controls['newPassword'].value,
      token: this.localStorageService.getLocalStorage('resetPasswordToken')
    }
    this.loginService.resetPassword(params).subscribe(
      (res: any) => {
        if (res.status !== null) {
          this.toasterService.showSuccess('Your Password has been changed successfully. Login with your new password.', 'Success');
          this.router.navigate(['/login']);
        }
      },
      (error: any) => {
        this.toasterService.showError('Error', 'Error');
      }
    );
  }
 
}
