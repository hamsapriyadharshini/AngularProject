import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class CommonSharedService {
  // Observable
  progressLoader = new Subject<number>();
  selectedTab = new Subject<number>();
  paymentRedirectionEnable = new Subject<boolean>();
  public skey = 'af027f5884ec186b';

  public encryptUri(msg) {
    let encrypted = CryptoJS.AES.encrypt(
      msg,
      CryptoJS.enc.Utf8.parse(this.skey),
      {
        keySize: 16,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.ECB
      }
    );
    let transitmessage = encrypted.toString();
    return transitmessage;
  }

  public decryptUri(transitmessage) {
    try {
      let decrypted = CryptoJS.AES.decrypt(
        transitmessage,
        CryptoJS.enc.Utf8.parse(this.skey),
        {
          keySize: 16,
          padding: CryptoJS.pad.Pkcs7,
          mode: CryptoJS.mode.ECB
        }
      );
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      if (e instanceof Error) {
        return null;
      } else {
        return null;
      }
    }
  }
}
