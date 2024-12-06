import { Component, OnInit } from '@angular/core';
import axios from 'axios';

interface ScheduleEvent {
  tour: string;
  duration: string;
}

interface ScheduleData {
  [key: string]: ScheduleEvent[];
}

@Component({
  selector: 'app-schdulepage',
  templateUrl: './schdulepage.component.html',
  styleUrls: ['./schdulepage.component.scss']
})
export class SchdulepageComponent implements OnInit {
  loadschdule = false;
  scheduleData: ScheduleData = {};

  constructor() { }

  ngOnInit(): void {
    this.getSchdule()
  }

  originalOrder = (): number => {
    return 0;
  }

  getSchdule(){
    const options = {
      method: 'GET',
      url: 'https://cricket-api-nu.vercel.app/getSchdule',
    };
    
    axios.request(options).then( (response) => {
      this.scheduleData = response.data;
      this.loadschdule=true;
    }).catch(function (error) {
      console.error(error);
    });
  }

}
