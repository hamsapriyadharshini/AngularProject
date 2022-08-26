import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { PlatformLocation } from '@angular/common'
import { APPLABELCONSTANTS } from './config/app-label.constants';
import { Router, NavigationStart } from '@angular/router';
import { ToasterService } from './shared/toaster/toaster.service';
import 'hammerjs';
import { AlertDialogComponent } from './shared/alertDialog/alertDialog-component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly APPLABELCONSTANTS = APPLABELCONSTANTS;
  backButtonFlag: string = 'N';

  constructor(
    public loc: LocationStrategy, 
    public location: PlatformLocation,  
    public router: Router,
    public toasterService: ToasterService, 
    public dialog: MatDialog) {
      
    location.onPopState(() => {
      ///this.toasterService.showInfo('Back Button is disabled','Note:'); 
      window.location.hash= this.router.url;
      const dialogRef = this.dialog.open(AlertDialogComponent, {
        data: { backButton: true },
        disableClose: true,
        height: '20%',
        width: '25%',
        position: {
          top: '70px',
          left:'550px'
        }
      });
    });
}
  
   ngOnInit() {    
    window.addEventListener('onload', function(e) {
      document.onkeydown = function(e) {
        return (e.which || e.keyCode) != 116;
      };
    });
  }
}
