import { Component, Inject, NgZone, OnInit, Renderer2 } from '@angular/core';
import {AppService} from '../../app.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
import uniqueRandom from 'unique-random';
import { Meta } from "@angular/platform-browser";
import { DOCUMENT } from '@angular/common';
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
  guser : any;
  gusername:any;
  gemail:any;
  registerUserData = new User();
  loader = false;
  random = uniqueRandom(1, 100);
  checkmail=/^([a-z 0-9 \.-]+)@([a-z 0-9 -]+).([a-z]{2,8})(.[a-z]{2,8})?$/;
  constructor(
    private service:AppService,
    public router:Router,
    private metaservice : Meta,
     ngZone : NgZone,
    @Inject(DOCUMENT) private doc : Document,
    private render : Renderer2
    ) { 
      window['onSignIn'] = user => ngZone.run(
        ()=>{
          this.afterSignIn(user);
        }
      )
     }

  ngOnInit() {
    this.metaservice.addTags([
      {name : 'google-signin-clinet-id', content : '1045295688564-run4hqjs8a39i8va0d2376dit5kaejlb.apps.googleusercontent.com'}
    ]);

    let script = this.render.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.defer = true;
    script.async = true;
    this.render.appendChild(document.body,script);
  }
  afterSignIn(googleUser){
    this.guser = googleUser;
    this.registerUserData.username = this.guser.dt["Se"];
    // console.log(this.random().toString());
    this.registerUserData.email = this.guser.dt["Ot"];
    this.registerUserData.password = this.guser.dt["Ot"];
    this.registerUserData.cnfpassword = this.guser.dt["Ot"];
    this.registerUser();
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
    this.loader = true;
    setTimeout(()=>{
      this.service.signup(this.registerUserData)
      .subscribe(
        (res:any) =>{
          window.localStorage.setItem('token',res.token)
          window.localStorage.setItem('id', JSON.stringify(res.user._id))
          window.localStorage.setItem('un', JSON.stringify(res.user.username))
          setTimeout(() => {
            this.router.navigate(['/admin/',res.user.username])
            this.loader = false;
            // this.spinner.hide();
          }, 4000);
        },
        (err)=>{
          if(err instanceof HttpErrorResponse){
            if(err.status === 400){
              alert("Username already exists!");
              this.loader = false;
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

//{ "dt": { "fT": "100908711405247587680", "Se": "Mayank Chittora", "uU": "Mayank", "LS": "Chittora", "PJ": "https://lh3.googleusercontent.com/a-/AOh14GhZaa6Zd87QJ918F0x6sDBSzw_PzqKalc28uR95rg=s96-c", "Ot": "mayank123chittora@gmail.com" } }
// { "ya": "100908711405247587680", "$b": { "token_type": "Bearer", "access_token": "ya29.a0ARrdaM8kaWSvzfKbqqf6FRv6we0iNpxq7CuxD-8BPpfqHNQbvGufwdtsqQBnBW8ETZ7xJ-cgLBIIECrBiGtlU7i3D8bMUr3LD_C6ef8oKQavJEisXQ57C0Jg8f2Q3aK0iEyc-xQPpiW05PD4hjesciWyXs53", "scope": "email profile openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile", "login_hint": "AJDLj6JUa8yxXrhHdWRHIV0S13cAuJs-XtpyJpKGh88jz1zrTwmwsQQ8SNIR4b7RGKJsIop2RzXnVs9r-_H-VRgzlxuU6dEYxw", "expires_in": 3599, "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjhkOTI5YzYzZmYxMDgyYmJiOGM5OWY5OTRmYTNmZjRhZGFkYTJkMTEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTA0NTI5NTY4ODU2NC1ydW40aHFqczhhMzlpOHZhMGQyMzc2ZGl0NWthZWpsYi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjEwNDUyOTU2ODg1NjQtcnVuNGhxanM4YTM5aTh2YTBkMjM3NmRpdDVrYWVqbGIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDA5MDg3MTE0MDUyNDc1ODc2ODAiLCJlbWFpbCI6Im1heWFuazEyM2NoaXR0b3JhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoibXY3S0Z5RllMWHlTZnJnRjQ4bmhvZyIsIm5hbWUiOiJNYXlhbmsgQ2hpdHRvcmEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2haYWE2WmQ4N1FKOTE4RjB4NnNEQlN6d19QenFLYWxjMjh1Ujk1cmc9czk2LWMiLCJnaXZlbl9uYW1lIjoiTWF5YW5rIiwiZmFtaWx5X25hbWUiOiJDaGl0dG9yYSIsImxvY2FsZSI6ImVuIiwiaWF0IjoxNjMyOTg3OTE3LCJleHAiOjE2MzI5OTE1MTcsImp0aSI6Ijg4OTg0Y2U4ZmE2ZDYzY2NkZWRjZjRhZjhkNzVjNDI0MzE2ZjJhOGQifQ.x3N_Al21EEJbia3kQM5lmNlXE-x4YJsm0xdNeftPaIHzMbSeHQ6Je3wQy0WQJYZ8FzBSli2uuQ1vQBqKcHf3LGw05gPtU4e9r7nEIB8ChkdsvHwAxshJw1JUUiOSK2pvXpKK01WYukErvSdAFcM5itouWrUY14X47fgD6m4Xm-TtB7jHVfO1nbxigze8gYNnBFYVnnCXRg09mRAdkVXj6BEJFbQBee8PqMd-ENYDv7VkmatPGwzuioH--m0P3k6zJ7VphqQBqMdVaWfB-7KUrdzB10dAH0RBDkoMDV1DFS3rZMfFv7IoGfmGABeTsqwdOgfVoPgE-HnLSUTFFzbaSQ", "session_state": { "extraQueryParams": { "authuser": "0" } }, "first_issued_at": 1632987916669, "expires_at": 1632991515669, "idpId": "google" }, "dt": { "fT": "100908711405247587680", "Se": "Mayank Chittora", "uU": "Mayank", "LS": "Chittora", "PJ": "https://lh3.googleusercontent.com/a-/AOh14GhZaa6Zd87QJ918F0x6sDBSzw_PzqKalc28uR95rg=s96-c", "Ot": "mayank123chittora@gmail.com" } }
