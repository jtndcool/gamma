import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, timeout } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { LoggedUser } from '../models/LoggedUser';
import * as CryptoJS from 'crypto-js';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedUser = new BehaviorSubject<LoggedUser>(null);

  constructor(private _http: HttpClient, private _route:Router) { }

  login(email: String, password: String){
    return this._http.post(environment.baseUrl + "/authenticate",{
      'email': email,
      'password': password
    }).pipe(timeout(10000), catchError(this.handleError));
}
private handleError(httpError: HttpErrorResponse) {
  return throwError("httpError");
}

encryptData(data) {
  if(data == null || data == undefined)
   return;

  try {
    return CryptoJS.AES.encrypt(JSON.stringify(data), 'hurryHotels').toString();
  } catch (e) {
    console.log(e);
  }
}
decryptData(data) {
  if(data == null || data == undefined)
   return;
  try {
    const bytes = CryptoJS.AES.decrypt(data, 'hurryHotels');
    if (bytes.toString()) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return data;
  } catch (e) {
    console.log(e);
  }
}

autoLogin(){
 var loggedUser:LoggedUser = this.decryptData(localStorage.getItem('user'));
 console.log('sdfghj', loggedUser?.['userName'])
 if(loggedUser?.['userName'] == null || loggedUser?.['userName'] == undefined){
    this.loggedUser.next(null);
    localStorage.setItem('user',null);
 }
 this.loggedUser.next(loggedUser);
 console.log("----------autologin------", loggedUser)
}
logOut() {
        localStorage.removeItem('user');
        this.loggedUser.next(null);
        this._route.navigate(['/login']);
}


}
