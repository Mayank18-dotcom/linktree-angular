import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute } from "@angular/router";
import { AppService } from "../../app.service";
import {Location} from '@angular/common';
// import * as test from "../../../scripts";
import * as $ from 'jquery' 
export class Newlink{
  public name: any;
  public link :any;
}
export class NewImg {
  public image: any;
}
@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {
  parseusername : any;
  data:any;
  sublinks:any;
  linkdata = new Newlink();
  newimg = new NewImg();
  userid:any;
  linkid:any;
  linkname:any;
  linkurl:any;
  no_of_links:number;
  img:any;
  image:any;
  imageUrl:any;
  ImageBaseData:any;
  
  loader = true;
  constructor(private rt:Router , private router : ActivatedRoute, private service : AppService,private _location: Location) { 
    this.router.params.subscribe(params=>{
      this.parseusername = params.username;
      if(JSON.parse(window.localStorage.getItem('un'))== this.parseusername){
        this.userid=JSON.parse(window.localStorage.getItem('id'));
      }
    })
  }
  
  ngOnInit() {
    this.ImageBaseData = 'https://i.ibb.co/1sr471r/preview.png';
    this.service.mainlink(this.parseusername).subscribe(res=>{
      this.data = res[0];
      this.sublinks = this.data.sublinks;
      this.no_of_links = this.sublinks.length;
      this.image = this.data.img;
      this.imageUrl = this.image;
      console.log(this.data)
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
      this.loader = false;
    })
  }
  handleFileInput(files: FileList) {
    var me = this;
    let file = files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      // console.log(reader.result);
      me.ImageBaseData=reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
  editProficPic(){
    this.newimg.image = this.ImageBaseData;
      console.log(this.newimg.image);
    this.service.updatePic(this.parseusername, this.newimg).subscribe(res=>{
      window.location.reload();
    })
  }
  postLink(){
    this.service.addLink(this.linkdata,this.userid).subscribe(res=>{
      window.location.reload();
    })
  }
  editLink(){
    this.service.editLink(this.linkdata,this.linkid).subscribe(res=>{
      window.location.reload();
    })
  }
  getLinkInfo(link,name,url){
    this.linkid = link;
    this.linkname=name;
    this.linkurl = url;
    console.log(name,url);
  }
  deleteLink(){
    this.service.delLink(this.linkid).subscribe(result=>{
      window.location.reload();
    })
  }
  addnewlink(){
    if(this.linkdata.name==null){
      alert("Link Title is Empty")
    }else if(this.linkdata.link==null){
      alert("URL is Empty")
    }
    else{
      this.postLink()
    }
  }
  updatelink(){
    if(this.linkdata.name==null){
      this.linkdata.name = this.linkname;
    }if(this.linkdata.link==null){
      this.linkdata.link = this.linkurl;
    }
    this.editLink()
  }
  gotolink(link)
  {
    window.open(link);
  }
  gotomainlink()
  {
    window.open('https://weblink-analysis.vercel.app/'+this.parseusername);
  }
}