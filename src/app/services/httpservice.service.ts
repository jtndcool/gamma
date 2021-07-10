import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { catchError, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommunicationService } from './communication.service';
import { BookingRequest } from '../models/booking-request';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private _http: HttpClient, private _loginService:LoginService) { }

  getHotels(city: string) {
    return this._http.post<any>(environment.baseUrl + "/getHotelsList", {
      "city": city
    }).pipe(timeout(10000),
      catchError(this.handleError));
  }

  getHotelsFromCity(city: String) {
    return this._http.get(environment.baseUrl + "/getHotels/" + city).pipe(timeout(10000), catchError(this.handleError));
  }
  getHotelInfo(hotelId: String) {
    return this._http.get(environment.baseUrl + "/hotelInfo/" + hotelId).pipe(timeout(10000), catchError(this.handleError));
  }

  bookHotel(bookHotelRequest: any) {
    return this._http.post(environment.baseUrl + "/bookHotel", bookHotelRequest).pipe(timeout(10000), catchError(this.handleError));
  }
  getbookingHistory(userId: String) {
    return this._http.post(environment.baseUrl + "/getBookingHistory", {
      'userId': userId
    }).pipe(timeout(10000), catchError(this.handleError));
  }
  register(payload:any){
    return this._http.post(environment.baseUrl + "/signUp", payload).pipe(timeout(10000), catchError(this.handleError));
  }


  private handleError(httpError: HttpErrorResponse) {
    if(httpError?.['status'] == 403){
      this._loginService.logOut();
    }
    return throwError(httpError);
  }


}
