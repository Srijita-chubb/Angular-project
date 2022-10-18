import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookserviceService {
  body: any;
  message:string="";
  constructor(private httpClient: HttpClient) { }
  setMessage(data:any){
    this.message = data;
  }
  getMessage(){
    return this.message;
  }

  updateData(data:any, id:string): Observable<any>{
    this.body = {
      "tickets": data
    }
    console.log(this.body);
    return this.httpClient.put<any>(`https://633ff92ae44b83bc73c5a8d5.mockapi.io/movie_app/${id}`, this.body).pipe(retry(1), catchError(this.handleError));

  }
  handleError(err: any){
    return throwError(() =>{
      console.log((err));
    })
  }

  
}
