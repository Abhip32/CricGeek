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
    this.getPOTW();
    this.getOnThisDay()
    this.apiNews();
  }

  async getFlag(flag: string)  {
    try {
      const response: AxiosResponse<any> = await axios.get(`https://cricket-api-nu.vercel.app/getTeamFlag/${flag}`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }



  async getLiveData() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getLive');
      this.currentmatchesdata = await response.data;    
      this.getFlag(this.currentmatchesdata[0].teamA).then((flag) => {
        this.currentmatchesdata[0].flagA=flag;
      });
      this.getFlag(this.currentmatchesdata[0].teamB).then((flag) => {
        this.currentmatchesdata[0].flagB=flag;
      });
    
      this.score=true; 
    } catch (error) {
      console.error('Error getting live data:', error);
    }
  }

  
  async getPOTW() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/POTW');
      this.POTW = await response.data;     
    } catch (error) {
      console.error('Error getting live data:', error);
    }
  }


  async getOnThisDay() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/onThisDay');
      this.onThisDay = await response.data;   
      console.log(this.onThisDay)  
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
