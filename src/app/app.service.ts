import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http : HttpClient){}
  url : string = "https://linktree-app.herokuapp.com";
  // url : string = "http://localhost:3000";
  
  signup(user)
  {
   return this.http.post(this.url+'/user/signup',user);
  }
  login(user)
  {
   return this.http.post(this.url+'/user/login',user);
  }
  mainlink(user){
    return this.http.get(this.url+'/mainlink/'+user);
  }
  getUser()
  {
    return window.localStorage.getItem('un')
  }
  addLink(newlink,userid){
    return this.http.post(this.url+'/sublinks/create/'+userid,newlink)
  }
  delLink(id){
    return this.http.get(this.url+'/sublinks/delete/'+id);
  }
  editLink(newlink,linkid){
    return this.http.post(this.url+'/sublinks/update/'+linkid,newlink)
  }
  updatemaincount(user){
    return this.http.get(this.url+'/mainlink/countinc/'+user);
  }
  updatesublinkcount(user){
    return this.http.get(this.url+'/sublink/countinc/'+user);
  }
  updatePic(user,newimg){
    return this.http.post(this.url+'/upload/'+user,newimg);
  }
  getToken()
  {
    return window.localStorage.getItem('token')
  }
  getId()
  {
    return window.localStorage.getItem('id')
  }
  loggedIn()
  {
    return !!window.localStorage.getItem('token')
  }
}
