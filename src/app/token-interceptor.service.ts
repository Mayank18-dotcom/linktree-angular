import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {AppService} from './app.service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }
  intercept(req,next) {
    let service = this.injector.get(AppService)
    let tonkenizedReq = req.clone({
      setHeaders:{
        Authorization : `bearer ${service.getToken()}`
      }
    })
    return next.handle(tonkenizedReq)
  }
}