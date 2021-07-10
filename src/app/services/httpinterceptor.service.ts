import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggedUser } from '../models/LoggedUser';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor {

  constructor(private _loginService:LoginService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    console.log('---------request is--------',req?.url);
    console.log('btaao sach',req?.url.includes('bookHotel'), loggeduser?.['token']==null , loggeduser?.['token']== undefined);
    var loggeduser:LoggedUser = this._loginService.decryptData(localStorage.getItem('user'));
    console.log('logged', loggeduser);
    if(loggeduser?.['token']==null || loggeduser?.['token']== undefined)
      return next.handle(req);

    if(req?.url.includes('getBookingHistory') || req?.url.includes('bookHotel') )  {
      console.log('auth vaali services hain')
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${loggeduser?.['token']}`
        }
      });   
      return next.handle(req);
    }
    return next.handle(req);
  }
}
