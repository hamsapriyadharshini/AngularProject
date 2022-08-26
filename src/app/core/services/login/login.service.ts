import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../../../shared/common/local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly JWT_TOKEN = 'token';
  private readonly REFRESH_TOKEN = 'refreshToken';
  ApiEndpoint: string;
  LoginEndpoint: string;
  PaymentEndpoint: string;
  CreditCardurl: string;
  DebitCardurl: string;
  constructor(
    public http: HttpClient,
    public router: Router,
    public localStorageService: LocalStorageService,

  ) {}

  login(InputUser) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic QkVZX09BdXRoMl9DbGllbnQ6VGVzdEAxMjM=',
      }),
    };
    return this.http.post(this.LoginEndpoint + 'signIn', InputUser);
  }
  public refreshToken() {
    return this.http
      .post<any>(
         this.ApiEndpoint  + 'auth-service/login/refreshToken',
        {
          refreshToken: this.getRefreshToken(),
          grantType: 'refresh_token',
        }
      )
      .pipe(
        tap((tokenVal: any) => {
          if (tokenVal.status == 200 && tokenVal.data) {
            this.storeTokens(tokenVal.data);
          }
        })
      );
  }
  public getRefreshToken() {
    return sessionStorage.getItem(this.REFRESH_TOKEN);
  }
  public storeJwtToken(jwt: string) {
    sessionStorage.setItem(this.REFRESH_TOKEN, jwt);
  }
  public storeTokens(data: any) {
    sessionStorage.setItem(this.JWT_TOKEN, data.token);
    sessionStorage.setItem(this.REFRESH_TOKEN, data.refreshToken);
  }
  public getGuestDetails() {
    let params = {
      guestUser: true,
    };
    return this.http.post(this.LoginEndpoint + 'signIn', params);
  }

  onChangePasword(changePasswordObj) {
    return this.http.post(
       this.ApiEndpoint  + 'login/changePassword  ',
      changePasswordObj
    );
  }

  doLogout() {
    let queryParams = new HttpParams().set(
      'token',
      sessionStorage.getItem('token')
    );

    return this.http.get( this.ApiEndpoint  + 'login/signOut', {
      params: queryParams,
    });
  }

  public signUp(dob) {
    let queryParams = new HttpParams()
    .set('dob', dob)    
    return this.http.get(
       this.ApiEndpoint  + 'user/signUp',
      { params: queryParams, responseType: 'text' }
    );
  }

  public onForgotPassWord(emailId) {
  let queryParams = new HttpParams()
  .set('emailId', emailId)
    return this.http.post(
       this.ApiEndpoint  + 'user/forgotPassword',
      queryParams, {responseType: 'text'}    
    );
  }

  public getUserId() {
    let userId = sessionStorage.getItem('userId');
    let headers = new HttpHeaders();
    headers.set('userId', userId);
    return this.http.get(
       this.ApiEndpoint  + 'customer/findByUserId',
      { headers: headers }
    );
  }

  public validateOtp(otp,token) {
    let queryParams = new HttpParams()      
      .set('token', token)
      .set('otp', otp);
    return this.http.get(
       this.ApiEndpoint  + 'user/validateOtp',
      { params: queryParams }
    );
  }

  public confirmPasswordReset(token) {
      return this.http.get(
         this.ApiEndpoint  + 'user/confirmPasswordReset/'+ token,    
      );
  }

  public resetPassword(data) {
      return this.http.post(
         this.ApiEndpoint  + 'login/resetPassword' ,
        data   
      );
    }  
}
