import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { hotel } from 'src/app/models/hotel';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-hotelcard',
  templateUrl: './hotelcard.component.html',
  styleUrls: ['./hotelcard.component.scss']
})
export class HotelcardComponent implements OnInit {

  constructor(private _router:Router, private _communicationService:CommunicationService) { }
 
  ngOnInit(): void {
  }
  @Input() hotel:hotel;

  book(){
    this._router.navigate(['/hotel', this.hotel.hotelId]);
  }

}
