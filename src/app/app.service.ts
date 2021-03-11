import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http : HttpClient){}
  url : string = "https://linktree-app.herokuapp.com";
  signup(user)
  {
   return this.http.post(this.url+'/user/signup',user);
  }
  login(user)
  {
   return this.http.post(this.url+'/user/login',user);
  }
  getUser()
  {
    return window.localStorage.getItem('un')
  }
  getToken()
  {
    return window.localStorage.getItem('token')
  }
  loggedIn()
  {
    return !!window.localStorage.getItem('token')
  }
}
