import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
export class User {
  public username: any;
  public password: any;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = new User();
  yes:any;
  yess:any;
  loader = false;
  constructor(private service:AppService,public router:Router) { }
  loginUser () {
    this.loader = true;
    // this.spinner.show();
    setTimeout(()=>{
      this.service.login(this.loginUserData)
      .subscribe(
        (res:any) => {
          window.localStorage.setItem('token', res.token)
          window.localStorage.setItem('un', JSON.stringify(res.user.username))
          window.localStorage.setItem('id', JSON.stringify(res.user._id))
          setTimeout(() => {
            this.router.navigate(['/admin/',res.user.username])
            this.loader = false;
            // this.spinner.hide();
          }, 4000);
        },
        (err)=>{
          if(err instanceof HttpErrorResponse){
            if(err.status === 400){
              console.log(err)
              this.loader = false;
              alert(err.error);
              // this.spinner.hide();
            }
          }
          if(err instanceof HttpErrorResponse) {
            if(err.status === 401){
              this.loader = false;
              alert(err.error);
              // this.spinner.hide();
            }
          }
        }
      ) 
    },1000)
  }
  check(){
    if(this.loginUserData.username==null){
      alert("Username is Empty")
    }else if(this.loginUserData.password==null){
      alert("Password is Empty")
    }
    else{
      this.loginUser()
    }
  }
  ngOnInit() {
  }

}
