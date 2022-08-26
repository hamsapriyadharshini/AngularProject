import { Component, OnInit } from '@angular/core';
import { APPLABELCONSTANTS } from '../config/app-label.constants';
import { ToasterService } from '../shared/toaster/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../core/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly APPLABELCONSTANTS = APPLABELCONSTANTS;
  navLinks: any[];
  rows: any[];
  navIndex: number = 0;
  userMobNo: any;
  constructor(
    public activatedRoute: ActivatedRoute,
    public toasterService: ToasterService,
    private loginService: LoginService,
    private router: Router
  ) {}
  ngOnInit() {
    this.initializeNavLink();
    this.getUserId();    
  }

  initializeNavLink() {
    this.navLinks = [   
      {
        label: 'MY CART',
        link: '/home/myCart',
        index: 0,
      },  
      {
        label: 'WISHLIST',
        link: '/home/wishlist',
        index: 1,
      },
    ];
  }

  onNavLink(event, nav) {
    this.navIndex = nav.index;
  }
  
  public getUserId() {
    this.loginService.getUserId().subscribe(
      (res: any) => {
        if(res == null) {
          this.userMobNo = null;
          let userMobileNo = {          
            mobileNo: this.userMobNo,
          };
          sessionStorage.removeItem('userMobileNo');
          sessionStorage.setItem('userMobileNo', JSON.stringify(userMobileNo));
        } else {
          this.userMobNo = res.mobileNo;
          let userMobileNo = {          
            mobileNo: this.userMobNo,
          };
          sessionStorage.removeItem('userMobileNo');
          sessionStorage.setItem('userMobileNo', JSON.stringify(userMobileNo));
        }
      },
      (error: any) => {
        console.log('error', error);
        this.toasterService.showError('Error while getting details', 'Error');
      }
    );
  }
}
