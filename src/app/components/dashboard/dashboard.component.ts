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
  sublinks:any;
  image:any;
  imageUrl:any;
  loader = true;
  constructor(private service : AppService,public router:ActivatedRoute,public rt:Router) {
    this.router.params.subscribe(params=>{
      this.parseusername = params.username;
    })
   }
  ngOnInit() {
    // mainfun.myTest();
    this.username =  JSON.parse(this.service.getUser()); 
    this.service.mainlink(this.parseusername).subscribe(res=>{
      this.data = res[0];
      this.sublinks = this.data.sublinks;
      this.image = this.data.img;
      this.imageUrl = this.image;
      if(this.data !== undefined){
        this.checkaccount = this.data.username;
      }
      this.loader = false;
    })
    this.service.updatemaincount(this.parseusername).subscribe(res=>{
    })
  }
  gotolink(id,link)
  {
    window.open(link);
    this.service.updatesublinkcount(id).subscribe(res=>{
    })
  }
}