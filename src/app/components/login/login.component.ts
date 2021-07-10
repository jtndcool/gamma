import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { LoggedUser } from 'src/app/models/LoggedUser';
import { LoginService } from 'src/app/services/login.service';
import * as CryptoJS from 'crypto-js';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  anyonymousUserData:any=null;
  isLoading = false;
  constructor(private _loginService:LoginService,  private _notifications: NotificationsService, private _route:Router, private _communicationService:CommunicationService) { }

  ngOnInit(): void {
    this._communicationService.anyonymousUserData.subscribe(data =>{
      this.anyonymousUserData = data;
    })
  }
  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
}
  onSubmit(form:NgForm) {
   
    if(form.invalid)
    return;
   
    this.isLoading = true;
    this._loginService.login(form.value?.email, form.value?.password).subscribe(
      data=>{
        this.isLoading = false;
        var loggedUser = new LoggedUser(data['user']?.userName, data['user']?.email, data['user']?.password,data['user']?.userId, data['jwt']);
        this._loginService.loggedUser.next(loggedUser);
        form.reset();
        if(data['resultStatus'].status == 'FAILED'){
          this._notifications.error('Invalid User', 'Please enter a valid email/password', {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          });
          return;
        }
     
          this._notifications.success('Success..!', 'Welcome '+loggedUser.getUserName()+' to Hurry Hotels......!', {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          });
          console.log('-----------inside------------------------')
          localStorage.setItem('user',this._loginService.encryptData(loggedUser));
          if(this.anyonymousUserData?.['url'] == null || this.anyonymousUserData?.['url'] == undefined)
          this._route.navigate(['/home']);
          else {

            var url = this.anyonymousUserData?.['url'];
            this._communicationService.anyonymousUserData.next(null);
            console.log('lllllllllll', url);
            this._route.navigateByUrl(url);
            
          }
        
          


      },
      error=>{
        this.isLoading = false;
        this._notifications.error('Network error', 'Service down please try again after a while', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
      }
    )
  }
  onSubmit1() {
    console.log('retrieved object issssssss',this._loginService.decryptData(localStorage.getItem('user')));
  }


 
}
