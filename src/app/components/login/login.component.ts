import { Component, Inject, NgZone, OnInit, Renderer2 } from '@angular/core';
import {AppService} from '../../app.service';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
// import { NgxSpinnerService } from "ngx-spinner";
export class User {
  public username: any;
  public password: any;
}
import uniqueRandom from 'unique-random';
import { Meta } from "@angular/platform-browser";
import { DOCUMENT } from '@angular/common';
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
  guser;
  constructor(private service:AppService,public router:Router, 
    private metaservice : Meta,
     ngZone : NgZone,
    @Inject(DOCUMENT) private doc : Document,
    private render : Renderer2) { 
    window['onSignIn'] = user => ngZone.run(
      ()=>{
        this.afterSignIn(user);
      }
    )
  }
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
    this.loginUserData.username = this.guser.dt["Se"];
    this.loginUserData.password = this.guser.dt["Ot"];
    console.log(this.guser);
    this.loginUser();
  }
}
