import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AppService} from '../../app.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username : any;
  parseusername : any;
  data:any;
  checkaccount:any;
  constructor(private service : AppService,public router:ActivatedRoute,public rt:Router) {
    this.router.params.subscribe(params=>{
      this.parseusername = params.username;
    })
   }
  ngOnInit() {
    this.username =  JSON.parse(this.service.getUser()); 
    this.service.mainlink(this.parseusername).subscribe(res=>{
      this.data = res[0];
      console.log(this.data);
      if(this.data !== undefined){
        this.checkaccount = this.data.username;
      }
    })
    
    // console.log(this.username)
    // console.log(this.parseusername)
  }
}