import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { BookingRequest } from 'src/app/models/booking-request';
import { hotel } from 'src/app/models/hotel';
import { LoggedUser } from 'src/app/models/LoggedUser';
import { CommunicationService } from 'src/app/services/communication.service';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  constructor(private _route:ActivatedRoute, 
    private _http:HttpserviceService, 
     private _notifications: NotificationsService,
      private _loginService:LoginService,  private _router:Router, private _communicationService:CommunicationService) { }
  hotelId:String;
  hotelInfo:hotel;
  coupon:String="HURRY30";
  discounts:any = 0;
  perDayPrice:any;
  taxes:number;
  formSearch:NgForm;
  nights:number;
  totalPrice:number;
  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
}
  ngOnInit(): void {
  
    this.hotelId =  this._route.snapshot.paramMap.get('hotelId');

    this._http.getHotelInfo(this.hotelId).subscribe(data => {
        this.hotelInfo = data['hotel'];
        this.perDayPrice = parseInt(this.hotelInfo.price);
        this.totalPrice = 2 * this.perDayPrice;
        this.taxes = 0.20*this.totalPrice;
        this.totalPrice = this.totalPrice + this.taxes;
        console.log("toral price",this.totalPrice);
      
    })
  }
  applyCoupon(){
 
    if(this.coupon == 'HURRY30' || this.coupon == 'GETFIRST') {
      this.discounts = this.totalPrice*0.3;
      this.totalPrice = this.totalPrice - this.discounts;
      this._notifications.success('Congratulations..!', 'Coupon Applied successfully..You just saved ₹ '+this.discounts, {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
    }
 
 else {
   this.discounts = 0;
   this.totalPrice = this.perDayPrice*2 + this.taxes;
  this._notifications.error('Invalid Coupon', 'Please enter a valid coupon', {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  });
 }   

  }

  bookHotel() {
    var  bookingRequest={};
    var loggedUser:LoggedUser =this._loginService.decryptData(localStorage.getItem('user'));
    bookingRequest['hotelId'] = this.hotelId;
    bookingRequest['noOfDays'] = 2;
    bookingRequest['price'] = ~~this.totalPrice;
    bookingRequest['userId'] = loggedUser?.['userId'];
    this._http.bookHotel(bookingRequest).subscribe(data=>{
      console.log('data is booked', data);
      if(data?.['resultStatus'].status == 'SUCCESS')
      this._notifications.success('Successfully booked', 'Past bookings can be viewed under My bookings', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      else {
        this._notifications.error('Network error', 'Please try again...!', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      }
    },
    error=>{
      
      if(error['status'] == '403')
      this._notifications.error('Unauthorized', 'Please login first.......!', {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      });
      var anyonymousUserData = {};
      anyonymousUserData['url'] = this._router.url;
      this._communicationService.anyonymousUserData.next(anyonymousUserData);
      this._router.navigate(['/login']);
      
    })
  }

}

