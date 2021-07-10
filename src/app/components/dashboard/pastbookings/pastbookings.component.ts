import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpserviceService } from 'src/app/services/httpservice.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-pastbookings',
  templateUrl: './pastbookings.component.html',
  styleUrls: ['./pastbookings.component.scss']
})
export class PastbookingsComponent implements OnInit {

  constructor(private _http: HttpserviceService, private _route:Router, private _loginService:LoginService) { }
  bookingHistoryData:any[]=[];
  isData:boolean = false;
  ngOnInit(): void {
    var user = this._loginService.decryptData(localStorage.getItem('user'))?.userId;
    if(user == null || user == undefined)
      this._route.navigate(['login']);
    this._http.getbookingHistory(user).subscribe(data =>{
      console.log('datafgh', data); 
   
  
      if (data == null || data?.['resultstatus']?.status=='FAILED'){
        this.isData = false;
        return;
      }
      else 
      this.isData = true;
       
      this.bookingHistoryData = data?.['bookingHistoryList'];
      console.log('dataaaaaaaaaaaaaaaa', this.bookingHistoryData);
     
    },
    err =>{
      this.isData = false;
      if(err?.['status'] == 403)
        this._route.navigate(['login']);
    })
  }

}
