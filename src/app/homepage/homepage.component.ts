import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosResponse } from 'axios';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  index = false;
  match = true;
  row = false;
  score = false;
  title = 'CricGeek';
  currentmatchesdata: any = [];
  POTW: any =[];
  onThisDay: any =[];
  news:any = [];
  flag:any=[];



  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getLiveData();
    this.apiNews();
  }


  async getLiveData() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getLive');
      this.currentmatchesdata = await response.data; 
      this.score=true; 
    } catch (error) {
      console.error('Error getting live data:', error);
    }
  }

  


  async apiNews() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getNews');
      this.news = await response.data;   
      console.log(this.news)  
    } catch (error) {
      console.error('Error getting live data:', error);
    }
  }
  
}
