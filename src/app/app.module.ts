import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WebcamModule } from 'ngx-webcam';

import {
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatMenuModule,
  MatIconModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDatepickerModule,MatDividerModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from './shared/common/format-datepicker';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BasicAuthInterceptor } from './core/interceptors/basic-auth.interceptor';
import { LocalStorageService } from './shared/common/local-storage.service';
import { CommonSharedService } from './shared/common/common-shared.service';

/* Import Feature Model */
import {MatSelectModule} from '@angular/material/select';
import { GuestModule } from './guest/guest.module';
import { CommonArrayFilterPipe } from './shared/pipes/common-array-filter.pipe';
import { CommonDialogModuleComponent } from './shared/component/common-dialog-module/common-dialog-module.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DialogBoxComponent } from './shared/component/dialog-box/dialog-box.component';
import { DialogBoxService } from './shared/common/dialog-box.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DialogComponent } from './shared/dialogBox/dialog-component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './signin/signin.component';
import { OtpDialogComponent } from './shared/otpDialog/otpDialog-component';
import { RequestRedirect } from './shared/component/request-redirect/request-redirect.component';
import { AlertDialogComponent } from './shared/alertDialog/alertDialog-component';
import { ChangeConfirmPasswordComponent } from './change-confirm-password/change-confirm-password.component';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { ConfirmQuoteDialogComponent } from './shared/confirm-quote-dialog/confirm-quote-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CommonArrayFilterPipe,
    CommonDialogModuleComponent,
    DialogBoxComponent,
    ChangePasswordComponent,
    DialogComponent,
    HeaderComponent,
    SigninComponent,
    OtpDialogComponent,
    AlertDialogComponent,
    RequestRedirect,
    ChangeConfirmPasswordComponent,
    ConfirmQuoteDialogComponent,   
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatDialogModule,
    WebcamModule,
    BrowserAnimationsModule,
    MatMenuModule,
    NgxDatatableModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    }),
    MatSelectModule,
    MatDividerModule,
  ],
  entryComponents: [
    CommonDialogModuleComponent,
    DialogBoxComponent,
    DialogComponent,
    OtpDialogComponent,
    AlertDialogComponent,
    ConfirmQuoteDialogComponent,
    RequestRedirect
  ],
 
  bootstrap: [AppComponent],
})
export class AppModule {}
