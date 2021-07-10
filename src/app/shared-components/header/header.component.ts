import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private __loginService:LoginService) { }
  userName:String;

  ngOnInit(): void {
    console.log(this.__loginService.loggedUser.subscribe(data =>{
      if(data!=null)
      this.userName = data['userName'];
      console.log('logged in user is ',data, this.userName);
    } ));
  }
  logout() {
    this.__loginService.logOut();
    this.userName = null;
  }

}
