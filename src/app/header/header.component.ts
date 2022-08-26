import { Component, OnInit } from '@angular/core';
import { APPLABELCONSTANTS } from '../config/app-label.constants';
import { Router, NavigationStart } from '@angular/router';
import { LoginService } from '../core/services/login/login.service';
import { ToasterService } from '../shared/toaster/toaster.service';
import { AlertDialogComponent } from '../shared/alertDialog/alertDialog-component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  readonly APPLABELCONSTANTS = APPLABELCONSTANTS;
  activeLinkIndex = -1;
  logout: boolean = false;
  userType: string;
  loggedInAs: string;
  forcePwdChange: string;
  navLink: string;
  navIndex: number = 0;
  isLoggedIn: boolean = false;
  mobileMenu: boolean = false;
  showHeader: boolean = true;
  userInfo: any = [];
  url: any = [
    '/home',
  ];

  constructor(
    public router: Router,
    public loginService: LoginService,
    public toasterService: ToasterService,
    public dialog: MatDialog
  ) {
  }
  ngOnInit() {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      this.mobileMenu = false;
    } else {
      this.mobileMenu = true;
    }
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {   
       let path = event.url.split('/');
        if (path[1] !== 'resetPasswordOtp') {
          this.showHeader = true;
        } else {
          this.showHeader = false;
        }        
      }
    });
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        this.isGuestUser();
        if (event['url'] == '/home') {
          this.isLoggedIn = true;
        } else {
        }
      }
    });
  }

  routeToHome(event) {
    this.forcePwdChange == 'Y'
      ? event.stopPropagation()
      : this.router.navigate(['dashboard']);
  }

  onNavLink(event, nav) {
    this.forcePwdChange == 'Y'
      ? event.stopPropagation()
      : this.router.navigate([nav.link]);
    this.navIndex = nav.index;
  }

  onMenuChange(event) {
    this.loginService.doLogout().subscribe(
      (res: any) => {
        sessionStorage.clear();
        this.router.navigateByUrl('/login');
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }
  onChangePassword(event) {
    this.router.navigateByUrl('/changePassword');
  }
  isGuestUser() {
    this.userInfo = sessionStorage.getItem('userDetail')
      ? JSON.parse(sessionStorage.getItem('userDetail'))
      : '';
    if (this.userInfo.userName != undefined) {
      if (this.userInfo.userName == 'GUEST') {
        this.isLoggedIn = false;
      } else {
        this.isLoggedIn = true;
      }
    }
  }
  logOut() {
    this.loginService.doLogout().subscribe(
      (res) => {
        if (res['status'] == 200) {
          sessionStorage.clear();
          this.isLoggedIn = false;
          this.router.navigate(['/login']);
        } else {
          this.toasterService.showError('Error While Logout', 'Error');
        }
      },
      (err: any) => {
        this.toasterService.showError('Error While Logout', 'Error');
      }
    );
  }
  goToGuest() {
    let updatedIndex = this.url.findIndex((item) => {
      return item === this.router.url;
    });
 
    if (updatedIndex === -1) {
      this.router.navigate(['/guest']);
    } else if (updatedIndex >= 0) {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: { guest: true },
        disableClose: true,
      });
    }
  }
  goToLogin() {
    let updatedIndex = this.url.findIndex((item) => {
      return item === this.router.url;
    });
 
    if (updatedIndex === -1) {
      this.router.navigate(['/login']);
    } else if (updatedIndex >= 0) {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: { login: true },
        disableClose: true,
      });
    }
  }
  goToGuestSignUp() {
    let updatedIndex = this.url.findIndex((item) => {
      return item === this.router.url;
    });
 
    if (updatedIndex === -1) {
      this.router.navigate(['/signin']);
    } else if (updatedIndex >= 0) {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: { guestSignUp: true },
        disableClose: true,
      });
    }
  }
 
  goToHome() {
    let updatedIndex = this.url.findIndex((item) => {
      return item === this.router.url;
    });
 
    if (updatedIndex === -1) {
      this.router.navigate(['/home']);
    } else if (updatedIndex >= 0) {
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: { loggedIn: true },
        disableClose: true,
      });
    }
  }
  goToUserSignUp() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: { logOut: true },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      let logout = result.data;
      if (logout === true) {
        this.logOut();
      }
    });
  }
}
