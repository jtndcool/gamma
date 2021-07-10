import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { hotel } from 'src/app/models/hotel';
import { CommunicationService } from 'src/app/services/communication.service';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.scss']
})
export class SearchDetailsComponent implements OnInit {

  loading:boolean = false;

  constructor(private _httpService: HttpserviceService, private _route:ActivatedRoute, private _communicationService:CommunicationService) { }
  hotelList:hotel[]=[];
  city:String;

  ngOnInit(): void {
    this._communicationService.searchDetails.subscribe(data => {
      console.log("form dats", data.value);
      this.search(data?.value?.city);
    })
    console.log("pressed");
   this.city = this._route.snapshot.paramMap.get('city');
   if(this.city!=null && this.city?.length>0)
    this.search(this.city);
  }
  ngOnChanges(){
    console.log("pressed bruhhh");
  }
  search(city:String) {
  this.loading=true;
    let obs:Observable<any>;
    obs = this._httpService.getHotelsFromCity(this.city);
    obs.subscribe(data=>{
     if(data?.resultStatus?.status=="SUCCESS"){
      this.hotelList = data.hotelList;
      console.log("hotellist is",this.hotelList);
      this.loading=false;
     }
    },
    (errResp=>{
      console.log("error is",errResp);
      this.loading=false;
    }))
  }

}
