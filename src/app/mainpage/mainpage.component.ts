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
      const response: AxiosResponse<any> = await axios.get('https://cricket-api-nu.vercel.app/getLiveDataFromCricbuzz');
      this.rawmatchesdata = await response.data;
      for (let i = 0; i < this.rawmatchesdata.length; i++) {
        const match:any = this.rawmatchesdata[i];
        const title: string = match.title;

        // Extracting the team names from the title
        const teams: string[] = title.split(' vs ');
        const team1: string = teams[0];
        const team2: string = teams[1].substring(0, teams[1].indexOf(','));

        const flag1: string = await this.getFlag(team1);
        const flag2: string = await this.getFlag(team2);
        this.rawmatchesdata[i].flag1 = flag1;
        this.rawmatchesdata[i].flag2 = flag2;
      }

      this.currentmatchesdata = this.rawmatchesdata.filter((item: any) => item.status1 !== '');;
      console.log(this.currentmatchesdata);

      this.row = true;
      this.score = false;
    } catch (error) {
      console.error(error);
    }
  }

  async apiresult(): Promise<void> {
    try {
      const response: AxiosResponse<any> = await axios.get('https://cricket-api-nu.vercel.app/getRecentDataFromCricbuzz');
      this.resultsdata = await response.data;
      for (let i = 0; i < this.resultsdata.length; i++) {
        const match:any = this.resultsdata[i];
        const title: string = match.title;

        // Extracting the team names from the title
        const teams: string[] = title.split(' vs ');
        const team1: string = teams[0];
        const team2: string = teams[1].substring(0, teams[1].indexOf(','));

        const flag1: string = await this.getFlag(team1);
        const flag2: string = await this.getFlag(team2);
        this.resultsdata[i].flag1 = flag1;
        this.resultsdata[i].flag2 = flag2;
      }
      console.log(this.resultsdata);

      this.row = true;
      this.score = false;
    } catch (error) {
      console.error(error);
    }
  }

  async apiupcoming(): Promise<void> {
    try {
      const response: AxiosResponse<any> = await axios.get('https://cricket-api-nu.vercel.app/getUpcomingDataFromCricbuzz');
      this.upcomingmatchesdata = await response.data;
      for (let i = 0; i < this.upcomingmatchesdata.length; i++) {
        const match:any = this.upcomingmatchesdata[i];
        const title: string = match.title;

        // Extracting the team names from the title
        const teams: string[] = title.split(' vs ');
        const team1: string = teams[0];
        const team2: string = teams[1].substring(0, teams[1].indexOf(','));

        const flag1: string = await this.getFlag(team1);
        const flag2: string = await this.getFlag(team2);
        this.upcomingmatchesdata[i].flag1 = flag1;
        this.upcomingmatchesdata[i].flag2 = flag2;
        this.upcomingmatchesdata[i].team1 = team1;
        this.upcomingmatchesdata[i].team2 = team2;
      }

      this.row = true;
      this.score = false;
    } catch (error) {
      console.error(error);
    }
  }
}
