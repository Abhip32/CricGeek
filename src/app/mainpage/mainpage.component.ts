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

interface MatchTab {
  id: string;
  label: string;
  isActive: boolean;
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
  activeTab = 'live';
  matchTabs: MatchTab[] = [
    { id: 'live', label: 'Live', isActive: true },
    { id: 'recent', label: 'Recent', isActive: false },
    { id: 'upcoming', label: 'Upcoming', isActive: false }
  ];

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
      const allMatches = await response.data;
      this.currentmatchesdata = allMatches.filter((match: any) => match.teamA && match.teamB);
      console.log(this.currentmatchesdata);
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

  trackByMatchId(index: number, match: any): string {
    return match.id || index;
  }

  selectTab(tabId: string): void {
    this.activeTab = tabId;
    this.matchTabs = this.matchTabs.map(tab => ({
      ...tab,
      isActive: tab.id === tabId
    }));
  }
}
