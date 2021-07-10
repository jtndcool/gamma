import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HotelDetailComponent } from './components/dashboard/hotel-detail/hotel-detail.component';
import { PastbookingsComponent } from './components/dashboard/pastbookings/pastbookings.component';
import { SearchDetailsComponent } from './components/dashboard/search-details/search-details.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    component: DashboardComponent,
    children: [
      { path: "city/:city", component: SearchDetailsComponent }
    ]
  },
  { path: "city", component: SearchDetailsComponent },
  { path:"hotel/:hotelId", component:HotelDetailComponent } ,
  { path: "contact", component: ContactComponent } ,
  { path:"login", component:LoginComponent}, 
  { path:"register", component:SignupComponent},
  { path:"bookings", component:PastbookingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
