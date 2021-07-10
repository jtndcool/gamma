import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { HttpserviceService } from 'src/app/services/httpservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
}
isLoading = false;
  constructor(private _http: HttpserviceService, private _notificationService: NotificationsService) { }

  ngOnInit(): void {
  }
  login() {

  }
  onSubmit(form:NgForm) {
      console.log('sas',form);
      if(form.invalid){ return }
           var payload = {};
      payload['user'] = form.value;
      form.reset();

      this.isLoading = true;
      this._http.register(payload).subscribe(data=>{
        console.log('data')
        if(data?.['resultStatus'].status == 'FAILED')
        this._notificationService.error(data?.['resultStatus'].errorCode, data?.['resultStatus'].errorMsg, {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });

        else { 
          this._notificationService.success('Success', 'Hi '+payload['user'].userName+' you have been registered successfully..!', {
            timeOut: 3000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true
          });
        }
        this.isLoading = false;
      },
      error=>{
        this._notificationService.error('Unknown Network Error', 'Please try again', {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true
        });
        this.isLoading = false;
      })
  }
}
