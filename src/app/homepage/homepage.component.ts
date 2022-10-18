import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeserviceService } from '../services/homeservice.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  arr:any=[];
  init:boolean=true;
  constructor(private router:Router,private homeserviceobj:HomeserviceService) { }

  ngOnInit(): void {
    this.homeserviceobj.getData().subscribe((response) => {
      console.log(response,'home')
      this.arr = response;
      if(this.arr.length >0){
        this.init = false;
      }
    })
  }
  goTo(id:string,data:any)
  {
    console.log(data)
    this.router.navigate(['booking-component/'+id], { state: { data} })
  }

}
