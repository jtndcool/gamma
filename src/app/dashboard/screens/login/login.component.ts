import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { loginPayload } from '../../models/loginPayload';
import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error:any;
  isLoading:boolean = false;
  email_id:String;
  password:String;
  loginInfo:loginPayload;
  constructor(private _authService:AuthService, private _route:Router, private _notification:NotificationService) { }

  ngOnInit(): void {
    if(!!JSON.parse(localStorage.getItem('user'))) {
      this._route.navigate(['/home']);
    }
    
  }
  onSubmit(form:NgForm) {
   
    this.loginInfo = form.value;

    let loginObs: Observable<any>;
    loginObs = this._authService.login(this.loginInfo);
    this.isLoading=true;
    loginObs.subscribe(
      data=>{
        if(data) {
          const user = new User(data.email_id);
          this._authService.user.next(user);
          localStorage.setItem('user', JSON.stringify(user.email_id));
          this._notification.showSuccess("Successfully Logged in", "SUCCESS");
          this._route.navigate(['/home']);
          this.isLoading=false;
        }
        
        
      },
      errorResp=>{
        console.log(errorResp);
        this._notification.showError("Invalid Credentials...Please try again", "ERROR");
        this.isLoading=false;
      }
    )
  }
register() {
  this._route.navigate(['/signup'])
}

}
