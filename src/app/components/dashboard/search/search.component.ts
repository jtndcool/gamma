import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

interface City {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  selectedCity: string;
  fromDate: string;
  toDate: string;
  noOfGuests: string;

  cities: City[] = [
    {value: 'Delhi', viewValue: 'Delhi'},
    {value: 'Kolkata', viewValue: 'Kolkata'},
    {value: 'Chandigarh', viewValue: 'Chandigarh'},
    {value: 'Mumbai', viewValue: 'Mumbai'}
  ];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  guests: String[] = ["1","2","3","4"];

  @Output() searchItem = new EventEmitter<NgForm>();

  onSearch(form:NgForm){
    console.log("---------------------------",form);
    this.searchItem.emit(form);
  }


}
