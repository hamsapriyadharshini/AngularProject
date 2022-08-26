import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../component/dialog-box/dialog-box.component';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DialogBoxService {
  constructor(public dialog: MatDialog,
    public router: Router) { }

  show(
    message: string,
    isConfirmation: boolean,
    isSuccess: boolean = true,
    redirectUrl: string = null
  ): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      height: '350px',
      width: '450px',
      disableClose: true,
      data: {
        message: message,
        isConfirmation: isConfirmation,
        isSuccess: isSuccess
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // write after close implementation here.
      if (redirectUrl != null) {
        this.router.navigate([redirectUrl]);
      }
    });
  }
  showPayDialog(
    message: string,
    title: string,
    arabicContent: string,
    content: string,
    isConfirmation: boolean,
    failure: boolean = true,
    redirectUrl: string = null
  ): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      height: '420px',
      width: '500px',
      disableClose: true,
      data: {
        message: message,
        title: title,
        arabicContent: arabicContent,
        content: content,
        isConfirmation: isConfirmation,
        failure: failure,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // write after close implementation here.
      if (redirectUrl != null) {
        this.router.navigate([redirectUrl]);
      }
    });
  }
  
  showProduct(
    message: string,
    arabicContent: string,
    isConfirmation: boolean,
    isSuccess: boolean = true,
    redirectUrl: string = null
  ): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      height: '350px',
      width: '450px',
      disableClose: true,
      data: {
        message: message,
        arabicContent: arabicContent,
        isConfirmation: isConfirmation,
        isSuccess: isSuccess
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // write after close implementation here.
      if (redirectUrl != null) {
        this.router.navigate([redirectUrl]);
      }
    });
  }

}
