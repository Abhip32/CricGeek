import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios, { AxiosResponse } from 'axios';

interface Match {
  title: string;
  name: string;
  teamName1: string[];
  teamName2: string[];
  status1: string;
  status2: string;
  links: string[];
  flag1: string;
  flag2: string;
  team1: string;
  team2: string;
}

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  index = false;
  match = true;
  row = false;
  score = false;
  title = 'CricGeek';
  currentmatchesdata:any[] = [];
  rawmatchesdata:any[] = [];
  upcomingmatchesdata:any[] = [];
  resultsdata:any[] = [];
  schdule: any[] = [];
  datalodedlive = false;
  datalodedresult = false;
  datalodedupcoming = false;
  datascoresheets = false;

  isNumeric(num: any): boolean {
    return !isNaN(num);
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.apilive();
    this.apiresult();
    this.apiupcoming();
  }

  async apischdule(): Promise<void> {
    try {
      const response: AxiosResponse<any> = await axios.get('https://cricket-api-nu.vercel.app/getSchdule');
      this.schdule = await response.data;
      console.log(this.schdule);
      this.row = true;
      this.score = false;
    } catch (error) {
      console.error(error);
    }
  }

  async getFlag(flag: string): Promise<string> {
    try {
      const response: AxiosResponse<any> = await axios.get(`https://cricket-api-nu.vercel.app/getTeamFlag/${flag}`);
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }



  async apilive(): Promise<void> {
    try {
      const response: AxiosResponse<any> = await axios.get('https://cricket-api-nu.vercel.app/getLive');
      this.currentmatchesdata = await response.data;
      this.score=true;
    } catch (error) {
      console.error(error);
    }
  }

  async apiresult(): Promise<void> {
    try {
      const response: AxiosResponse<any> = await axios.get('https://cricket-api-nu.vercel.app/getRecent');
      this.resultsdata = await response.data;
      console.log(this.resultsdata);
    } catch (error) {
      console.error(error);
    }
  }

  async apiupcoming(): Promise<void> {
    try {
      const response: AxiosResponse<any> = await axios.get('https://cricket-api-nu.vercel.app/getUpcoming');
      this.upcomingmatchesdata = await response.data;
      console.log(this.upcomingmatchesdata);
    } catch (error) {
      console.error(error);
    }
  }
}
