import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from "./components/signup/signup.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { AdmindashComponent } from "./components/admindash/admindash.component";
import { StatsComponent } from "./components/stats/stats.component";
import { AuthGuard } from "./auth.guard";
const routes: Routes = [
  {path:'', redirectTo: '/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:':username',component:DashboardComponent},
  {path:'stats/:username',component:StatsComponent,canActivate:[AuthGuard]},
  {path:'admin/:username',component:AdmindashComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
