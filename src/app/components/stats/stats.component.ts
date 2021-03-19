import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AppService} from '../../app.service'
import Chart from 'chart.js'
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  username : any;
  parseusername : any;
  data:any;
  checkaccount:any;
  sublinks:any;
  sublink_names=[];
  sublink_counts=[];
  countmainlink=0;
  dailycountmainlink=0;
  loader = true;
  no_of_links:any;
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
      // console.log(this.data);
      if(this.data !== undefined){
        this.sublinks = this.data.sublinks;
        this.checkaccount = this.data.username;
        this.countmainlink=this.data.countmainlink;
        this.dailycountmainlink = this.data.dailycountmainlink;
        this.no_of_links = this.sublinks.length;
        this.getLables();
        this.getCount();
        this.plotgraph();
        this.loader = false;
      }
      // console.log(this.sublinks);
      this.loader = false;
    })
    $(document).ready(function(){
      if ($(window).width() < 514) {
        $('#card1').removeClass('col-3');
        $('#card1').addClass('row');
      }
    });
    $(function() {

      'use strict';
    
      $('.js-menu-toggle').click(function(e) {
    
        var $this = $(this);

        if ( $('body').hasClass('show-sidebar') ) {
          $('body').removeClass('show-sidebar');
          $this.removeClass('active');
        } else {
          $('body').addClass('show-sidebar');	
          $this.addClass('active');
        }
        e.preventDefault();
      });
    });
    // this.service.updatemaincount(this.parseusername).subscribe(res=>{
    // })
  }
  getLables(){
    this.sublinks.forEach(element => {
      this.sublink_names.push(element.name)
    });
  }
  getCount(){
    this.sublinks.forEach(element => {
      this.sublink_counts.push(element.count)
    });
    // console.log(this.sublinks);
  }
  plotgraph(){
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.sublink_names,
        datasets: [{
          label: 'sublink count',
          data: this.sublink_counts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: false,
        legend : {
          labels :{
            fontSize : 20
          }
        },
        scales: {
          xAxes: [{
    
              gridLines: {
              offsetGridLines: true // à rajouter
            }
          },
      ],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  gotolink(id,link)
  {
    window.open(link);
    // this.service.updatesublinkcount(id).subscribe(res=>{
    // })
  }

}
