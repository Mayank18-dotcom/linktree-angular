import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username : any;
  constructor(private service : AppService) { }

  ngOnInit() {
    this.username =  JSON.parse(this.service.getUser()); 
    console.log(this.username)
  }
}