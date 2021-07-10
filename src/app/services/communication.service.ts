import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { hotel } from '../models/hotel';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  public searchDetails = new Subject<any>();  
  public anyonymousUserData = new BehaviorSubject<any>(null);
  searchCity(form:NgForm){
    this.searchDetails.next(form);
  }
  constructor() { }
}
