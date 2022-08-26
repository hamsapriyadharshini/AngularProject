import { Component, Inject } from '@angular/core';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { APPLABELCONSTANTS } from '../../config/app-label.constants';
import { Router } from '@angular/router';

@Component({
    selector: 'alertDialog-component',
    templateUrl: 'alertDialog-component.html'
})
export class AlertDialogComponent {
    requireFields: any;
    readonly APPLABELCONSTANTS = APPLABELCONSTANTS;
    guest: any;
    loggedIn: any;
    login: any;
    guestSignUp: any;
    logout: any;
    backButton:boolean = false;
    constructor(
        public router: Router,
        public dialogRef: MatDialogRef<AlertDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        if (data.guest === true) {
            this.guest = true;
        } else if (data.loggedIn === true) {
            this.loggedIn = true
        } else if (data.login === true) {
            this.login = true;
        } else if (data.guestSignUp === true) {
            this.guestSignUp = true;
        } else if (data.logOut === true) {
            this.logout = true;
        }  else if (data.backButton === true) {
            this.backButton = true;
        }
    }
    Ok() {
        this.dialogRef.close();
    }
    No() {
        this.dialogRef.close();
    }
    Yes() {
        if (this.guest === true) {
            this.router.navigate(['/guest']);
            sessionStorage.removeItem('previousUrl');
            this.dialogRef.close();
        } else if (this.login === true) {
            this.router.navigate(['/login']);           
            sessionStorage.removeItem('previousUrl');
            this.dialogRef.close();
        } else if (this.guestSignUp === true) {
            this.router.navigate(['/signin']);          
            sessionStorage.removeItem('previousUrl');
            this.dialogRef.close();
        } else if (this.logout === true) {
            this.dialogRef.close({ data: true })
        }
    }
}
