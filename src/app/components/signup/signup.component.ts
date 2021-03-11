import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
export class User {
  public username: any;
  public email: string;
  public password: any;
  public cnfpassword: any;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerUserData = new User();
  checkmail=/^([a-z 0-9 \.-]+)@([a-z 0-9 -]+).([a-z]{2,8})(.[a-z]{2,8})?$/;
  constructor(private service:AppService,public router:Router) { }

  ngOnInit() {
  }
  checkPassword(str) {
  var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  return re.test(str);
  }
  checkRegno(str) {
    var re = /^[0-9]{10,10}$/;
    return re.test(str);
  }
  registerUser(){
    setTimeout(()=>{
      this.service.signup(this.registerUserData)
      .subscribe(
        (res:any) =>{
          window.localStorage.setItem('token',res.token)
          window.localStorage.setItem('un', JSON.stringify(res.user.username))
          setTimeout(() => {
            this.router.navigate(['/dashboard',res.user.username])
            // this.spinner.hide();
          }, 4000);
        },
        (err)=>{
          if(err instanceof HttpErrorResponse){
            if(err.status === 400){
              console.log(err)
              alert("Username already exists!");
              // this.spinner.hide();
            }
          }
        }
      )
    },1000)
  }
  check(){
    if (this.registerUserData.username == null || this.registerUserData.username.length <= 5 ){
      alert("Please provide username with length greater than 5 characters")
    } else if (this.registerUserData.password == null || !this.checkPassword(this.registerUserData.password)){
      alert("Please enter a proper password having a length greather than 6 characters including atleast a lower case character , an upper case character, a number and a special character");
    }else if(this.registerUserData.password != this.registerUserData.cnfpassword){
      alert("Confirm password not equal to password !");
    }else if(this.registerUserData.email==null || this.checkmail.test(this.registerUserData.email)==false){
      alert("Email is of wrong format")
    }
    else{
      this.registerUser()
    }
  }
}
