import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {

  constructor(private httpclient:HttpClient) { }

  getData(){
    return this.httpclient.get('https://633ff92ae44b83bc73c5a8d5.mockapi.io/movie_app');
  }

}
