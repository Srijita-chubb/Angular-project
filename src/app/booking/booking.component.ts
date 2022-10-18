import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookserviceService } from '../services/bookservice.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  product: any;
  data: any;
  var1: string = "";
  var2: number = 0;
  var3: any;
  seatIndex: number = 0;
  seatIndex2: number = -1;
  seatReq: number = 0;
  phone: string = "";
  bookdate: string = "";
  totalSeats: number = 0;
  availableSeats: number = 0;
  disabledValue: boolean = true;
  user:any = {};
  allbookings:any = [];
  

  constructor(private router: Router, private book: BookserviceService) { 
    this.product = router.getCurrentNavigation()?.extras.state;
    this.data = this.product.data;
    console.log(this.data)
  }

  ngOnInit(): void {
    console.log(this.var1);
    this.book.setMessage(this.var1);
  }
  onChange(event: any):void{
    this.seatIndex = parseInt(event.target.value);
    this.totalSeats = this.data.tickets[this.seatIndex];
    // this.availableSeats = this.totalSeats - this.seatReq;
    // this.data.tickets[this.seatIndex]= this.availableSeats;
  }

  toggle(){
    this.disabledValue = false;
  }

  onSubmit(data:any = {}){ 
    Swal.fire(
      'Ticket Booked!',
      'Thanks for booking!',
      'success',
    )
    data["movieName"] = this.data.name;
    this.data.tickets[this.seatIndex]-=this.seatReq;
    console.log(this.data.tickets);
    this.book.updateData(this.data.tickets,this.data.id).subscribe((data:any)=>{
      console.log(data)
    })
     //this.router.navigate(['gridcomponent-component']) 
     this.router.navigate(['']) 
    this.addUser(data);
    console.log(data);
  } 

  addUser(user:any){

    this.allbookings = JSON.parse(localStorage.getItem('users') || '[]')
      this.allbookings.push(user)
      localStorage.setItem('users',JSON.stringify(this.allbookings))

  }

}
