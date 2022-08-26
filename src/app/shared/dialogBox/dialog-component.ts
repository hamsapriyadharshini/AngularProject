import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'dialog-component',
  templateUrl: 'dialog-component.html'
})
export class DialogComponent {
  requireFields: any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.requireFields = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
