import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { hotel } from 'src/app/models/hotel';
import { CommunicationService } from 'src/app/services/communication.service';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading:boolean = false;
  isChildloaded:boolean = false;
  constructor(private _httpService: HttpserviceService, private _router:Router,private _route:ActivatedRoute,private _communicationService:CommunicationService) { this.isChildloaded=false; }

  ngOnInit(): void {
    console.log( this._router.url);
    if((this._router.url.includes('home') && this._router.url.includes('city')))
        this.isChildloaded=false;
    else if (this._router.url.includes('home'))
      this.isChildloaded=true;    

  }
  searchHotels(){
   
  }

  searchedDataReceiver(form:NgForm){

    this._communicationService.searchDetails.next(form);
    this._router.navigate(['/home/city', form.value.city]);
    this.isChildloaded=false;

  }
}
