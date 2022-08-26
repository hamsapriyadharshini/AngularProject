import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { APPLABELCONSTANTS } from '../../config/app-label.constants';
import { DialogBoxService } from '../common/dialog-box.service';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  constructor(
    public toastr: ToastrService,
    public dialogBoxService: DialogBoxService
  ) {}

  showSuccess(
    message: string,
    title: string,
    elapsedTime: number = APPLABELCONSTANTS.TOAST_TIMER.ELAPSED_TIME,
    position: string = APPLABELCONSTANTS.TOAST_POSITION.TOP_RIGHT
  ) {
    this.toastr.success(message, title, {
      timeOut: elapsedTime,
      positionClass: position,
      progressBar: true,
      progressAnimation: 'decreasing'
    });
  }

  showError(
    message: string,
    title: string,
    elapsedTime: number = APPLABELCONSTANTS.TOAST_TIMER.ELAPSED_TIME,
    position: string = APPLABELCONSTANTS.TOAST_POSITION.TOP_RIGHT
  ) {
    this.showDialog(message, false, false);

    // return this.toastr.error(message, title, {
    //   timeOut: elapsedTime,
    //   positionClass: position,
    //   progressBar: true,
    //   progressAnimation: 'decreasing'
    // });
  }
  showPaymentError(
    message: string,
    title: string,
    arabicContent: string,
    content: string,   
   // elapsedTime: number = APPLABELCONSTANTS.TOAST_TIMER.ELAPSED_TIME,
   // position: string = APPLABELCONSTANTS.TOAST_POSITION.TOP_RIGHT
  ) {
    this.showPaymentDialog(message,title,arabicContent,content, false, false);

    // return this.toastr.error(message, title, {
    //   timeOut: elapsedTime,
    //   positionClass: position,
    //   progressBar: true,
    //   progressAnimation: 'decreasing'
    // });
  }

  showWarning(
    message: string,
    title: string,
    elapsedTime: number = APPLABELCONSTANTS.TOAST_TIMER.ELAPSED_TIME,
    position: string = APPLABELCONSTANTS.TOAST_POSITION.TOP_RIGHT
  ) {
    return this.toastr.warning(message, title, {
      timeOut: elapsedTime,
      positionClass: position,
      progressBar: true,
      progressAnimation: 'decreasing'
    });
  }

  showInfo(
    message: string,
    title: string,
    elapsedTime: number = APPLABELCONSTANTS.TOAST_TIMER.ELAPSED_TIME,
    position: string = APPLABELCONSTANTS.TOAST_POSITION.TOP_RIGHT
  ) {
    this.toastr.info(message, title, {
      timeOut: elapsedTime,
      positionClass: position,
      progressBar: true,
      progressAnimation: 'decreasing'
    });
  }
 
  showContent(
    message: string,
    arabicContent: string,
    title: string,
    elapsedTime: number = APPLABELCONSTANTS.TOAST_TIMER.ELAPSED_TIME,
    position: string = APPLABELCONSTANTS.TOAST_POSITION.TOP_RIGHT
  ) {
    this.showMessage(message, arabicContent, false, false);
  }

  showDialog(message, isConfirmation, isSuccess) {
    this.dialogBoxService.show(message, isConfirmation, isSuccess);
  }
  showPaymentDialog(message, title, arabicContent, content, isConfirmation, isSuccess, ) {
    this.dialogBoxService.showPayDialog(message, title, arabicContent, content, isConfirmation, isSuccess);
  }
  showMessage(message, arabicContent, isConfirmation, isSuccess) {
    this.dialogBoxService.showProduct(message, arabicContent, isConfirmation, isSuccess);
  }
}