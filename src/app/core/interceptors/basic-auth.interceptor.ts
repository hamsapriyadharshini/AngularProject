import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

import { LocalStorageService } from '../../shared/common/local-storage.service';
import { LoginService } from '../services/login/login.service';
@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    private localStorageService: LocalStorageService,
    private injector: Injector
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    const currentUser = this.localStorageService.getLocalStorage('token')
      ? this.localStorageService.getLocalStorage('token')
      : '';
    // if (this.authService.getJwtToken()) {
    //   request = this.addToken(request, this.authService.getJwtToken());
    // }

    if (request.url.indexOf('signIn') > 0) {
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userDetail');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('creditLimit');
    } else if (currentUser && request.url.indexOf('getGuestUserDetails') < 0) {
      if (request.url.indexOf('refreshToken') < 0) {
        //to be uncommented for auth
        // request = request.clone({
        //   setHeaders: {
        //     Authorization:
        //       'Bearer ' + this.localStorageService.getLocalStorage('token')
        //   }
        // });
        //to be commented if auth is added
        request = request.clone({
          setHeaders: {
            Authorization: this.localStorageService.getLocalStorage('token')
          }
        });
      }
    }

    return next.handle(request).pipe(
      catchError(error => {
        const auth = this.injector.get(LoginService);

        if (error.status !== 401) {
          return throwError(error);
        } else if (error.status === 401) {
          return this.handle401Error(request, next);
        }
      })
    );
  }
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const auth = this.injector.get(LoginService);
      return auth.refreshToken().pipe(
        switchMap((tokenVal: any) => {
          this.isRefreshing = false;
          if (tokenVal.status == 200) {
            this.refreshTokenSubject.next(tokenVal.data.token);
            return next.handle(this.addToken(request, tokenVal.data.token));
          } else if (tokenVal.status == 500) {
            return auth.getGuestDetails().pipe(
              switchMap((tokenVal: any) => {
                this.isRefreshing = false;
                if (tokenVal.status === 200) {
                  sessionStorage.removeItem('token');
                  sessionStorage.removeItem('userId');
                  sessionStorage.removeItem('userDetail');
                  this.localStorageService.setLocalStorage(
                    'token',
                    tokenVal.data.token
                  );
                  this.localStorageService.setLocalStorage(
                    'userId',
                    tokenVal.data.userId
                  );
                  this.localStorageService.setLocalStorage(
                    'userDetail',
                    JSON.stringify(tokenVal.data)
                  );
                  this.refreshTokenSubject.next(tokenVal.data.token);
                  return next.handle(
                    this.addToken(request, tokenVal.data.token)
                  );
                }
              })
            );
          }
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}
