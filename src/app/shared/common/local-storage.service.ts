import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  setLocalStorage(key, value) {
    return sessionStorage.setItem(key, value);
  }

  getLocalStorage(key) {
    return sessionStorage.getItem(key);
  }
}
