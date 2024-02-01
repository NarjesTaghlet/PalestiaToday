import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-http',
  templateUrl: './http.component.html',
  styleUrls: ['./http.component.css']
})
export class HttpComponent implements OnInit{

constructor( private http: HttpClient){}

ngOnInit() {
  this.http.get('http://localhost:3000').subscribe(
      (response) => {
      console.log('response', response);
    },

    (error) => {
      console.log('error', error);
    },
    () => {
      console.log('Complete : ');
    }
  )
}

}
