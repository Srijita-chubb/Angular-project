import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BookserviceService } from '../services/bookservice.service';
import { HomeserviceService } from '../services/homeservice.service';

const Booking_schema = [
  {
    key: 'user_name',
    type: 'text',
    label: 'Name',
  },
  {
    key: 'movieName',
    type: 'string',
    label: 'Movie Name',
  },
  {
    key: 'user_number',
    type: 'number',
    label: 'Phone Number',
  },
  {
    key: 'user_bookdate',
    type: 'date',
    label: 'Movie Date',
  },
  {
    key: 'user_seat',
    type: 'number',
    label: 'Seats',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
@Component({
  selector: 'app-gridcomponent',
  templateUrl: './gridcomponent.component.html',
  styleUrls: ['./gridcomponent.component.css']
})
export class GridcomponentComponent implements OnInit {
  arr:any=[];
  init:boolean=true;
  isError :boolean = false
  displayedColumns: string[] = Booking_schema.map((col) => col.key);
  dataSource = new MatTableDataSource();
  columnsSchema: any = Booking_schema;

  constructor(private homeserviceobj:HomeserviceService, private bookserviceobj:BookserviceService) {
    this.dataSource.data = JSON.parse(localStorage.getItem('users') || '[]')
  }
  ngOnInit(): void {
    
    this.fetchAllMovies();
  }
  fetchAllMovies() {
    this.homeserviceobj.getData().subscribe((response) => {
      this.arr = response;
      if(this.arr.length >0){
        this.init = false;
      }
    })
  }
  confirm(edit:any)
  {
    let applicationData = JSON.parse(localStorage.getItem('users') || '[]')
    this.arr = this.arr.map((movie:any,i:any)=>{
      if(movie.name == edit.movieName)
      {
       applicationData.map((original:any)=>{
        if(edit.user_number == original.user_number)
        {
          console.log(edit.user_seat,original.user_seat)
          movie.tickets[parseInt(edit.user_time)] = movie.tickets[parseInt(edit.user_time)]-edit.user_seat+original.user_seat;
        }
        return original;
       })
        if(edit.user_seat!=0)
        {
          this.editHandler(movie)
        }
        else{
          this.isError = true
        }
      }
      return movie
    })
    if(!this.isError)
      localStorage.setItem('users',JSON.stringify(this.dataSource.data))
    else
    {
      this.dataSource.data = applicationData
      this.isError = false
    }
  }
  editHandler(movie:any) {
    console.log(movie)
    this.bookserviceobj.updateData(movie.tickets,movie.id).subscribe()
  }
}



