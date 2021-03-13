import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from "./auth.guard";
import { TokenInterceptorService } from "./token-interceptor.service";
// import {NgxSpinnerModule} from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { AdmindashComponent } from './components/admindash/admindash.component';
import {NgCircleProgressModule} from 'ng-circle-progress';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    AdmindashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    NgCircleProgressModule.forRoot({
      percent:100,
      animation:true,
      radius:50,
      outerStrokeWidth:8,
      innerStrokeWidth:4,
      titleColor: "black",
      outerStrokeColor:"rgba(107, 114, 128, var(--tw-bg-opacity))",
      innerStrokeColor:"black",
      animationDuration:300
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
