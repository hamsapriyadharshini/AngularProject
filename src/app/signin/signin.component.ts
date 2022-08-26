import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MaskDirective } from '../shared/datepicker/mask.directive';
import { LoginService } from '../core/services/login/login.service';
import { ToasterService } from '../shared/toaster/toaster.service';
import { Router } from '@angular/router';
import { APPLABELCONSTANTS } from '../config/app-label.constants';
import { DatePipe } from '@angular/common';
import { HelperService } from '../core/services/helper.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [MaskDirective, DatePipe],
})
export class SigninComponent implements OnInit {
  readonly APPLABELCONSTANTS = APPLABELCONSTANTS;
  signinForm: FormGroup;
  maskConfig = {
    mask: [
      new RegExp('\\d'),
      new RegExp('\\d'),
      '/',
      new RegExp('\\d'),
      new RegExp('\\d'),
      '/',
      new RegExp('\\d'),
      new RegExp('\\d'),
      new RegExp('\\d'),
      new RegExp('\\d'),
    ],
    showMask: false,
    guide: false,
    placeholderChar: '_',
    keepCharPositions: true,
  };
  dobMax: Date;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public loginService: LoginService,
    public datePipe: DatePipe,
    public helperService: HelperService,
    public toasterService: ToasterService
  ) {
    const today = new Date();
    this.dobMax = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDay()
    );
  }

  ngOnInit() {
    this.initSignInForm();
  }

  initSignInForm() {
    this.signinForm = this.formBuilder.group({
     dob: ['', Validators.required],   
    });
  }
  get s() {
    return this.signinForm.controls;
  }

  onSignIn() {
  
    let dob = this.signinForm.controls['dob'].value
      ? this.datePipe.transform(
          this.signinForm.controls['dob'].value,
          'yyyy-MM-dd'
        )
      : '';
    // };
  
    this.loginService.signUp(dob).subscribe(
      (res: any) => {
        if (res !== undefined) {       
          this.toasterService.showSuccess('Credentials are sent Successfully to your Email Id', 'Success');
          this.router.navigate(['login']);
        }
      },
      (error: any) => {       
        this.toasterService.showError(error.error, 'Error');
      }
    );
  }

  backToLogin() {
    this.router.navigate(['login']);
  }
}
