import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-schdulepage',
  templateUrl: './schdulepage.component.html',
  styleUrls: ['./schdulepage.component.scss']
})
export class SchdulepageComponent implements OnInit {
  schdule:any[]=[];
  loadschdule:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.getSchdule()
  }

  getSchdule(){
    const options = {
      method: 'GET',
      url: 'https://cricket-api-nu.vercel.app/getSchdule',
    };
    
    axios.request(options).then( (response) => {
      this.schdule=response.data;
      this.loadschdule=true;
    }).catch(function (error) {
      console.error(error);
    });
  }

}
