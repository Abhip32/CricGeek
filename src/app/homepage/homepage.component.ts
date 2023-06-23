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
  upcomingmatchesdata: any = [];
  resultsdata: any = [];
  scoresheetdata: any = [];
  scoresheetheadings: any = [];
  maindata: any = [];
  news: any = [];
  newsplus: any = [];
  stats: any = [];
  specials: any = [];
  opinions: any = [];
  spotlights: any = [];
  interviews: any = [];
  photos: any = [];
  scoresheettables: any = [];
  scoresheettables1: any = [];
  datalodedlive = false;
  datalodedresult = false;
  datalodedupcoming = false;
  datascoresheets = false;
  mflag0: any = '';
  mteam0: any = '';
  mflag1: any = '';
  mteam1: any = '';
  mtitle: any = '';
  timing: any = '';
  mprogress: any = '';
  movers0: any = ' ';
  movers1: any = '';



  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadData();
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

  async loadData() {
    try {
      await Promise.all([
        this.getLiveDataFromCricbuzz(),
        this.getNews(),
        this.getNewsPlus(),
        this.getStats(),
        this.getOpinions(),
        this.getInterviews(),
        this.getSpecials(),
        this.getSpotlights(),
        this.getPhotos()
      ]);
      console.log('Data loaded successfully');
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  async getLiveDataFromCricbuzz() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getLiveDataFromCricbuzz');
      this.currentmatchesdata = response.data;
      this.currentmatchesdata=this.currentmatchesdata.filter((item: any) => item.status1 !== '');
      for (let i = 0; i < this.currentmatchesdata.length; i++) {
        const match:any = this.currentmatchesdata[i];
        const title: string = match.title;

        // Extracting the team names from the title
        const teams: string[] = title.split(' vs ');
        const team1: string = teams[0];
        const team2: string = teams[1].substring(0, teams[1].indexOf(','));

        const flag1: string = await this.getFlag(team1);
        const flag2: string = await this.getFlag(team2);
        this.currentmatchesdata[i].flag1 = flag1;
        this.currentmatchesdata[i].flag2 = flag2;
      }
      this.datalodedlive = true;
      this.row = true;
      this.score = false;
    } catch (error) {
      console.error('Error getting live data:', error);
    }
  }

  async getNews() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getNews');
      this.news = response.data;
      await this.getNewsPlus();
    } catch (error) {
      console.error('Error getting news:', error);
    }
  }

  async getNewsPlus() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getNewsPlus');
      this.newsplus = response.data;
      console.log(this.newsplus);
    } catch (error) {
      console.error('Error getting additional news:', error);
    }
  }

  async getStats() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getStats');
      this.stats = response.data;
      console.log(this.stats);
    } catch (error) {
      console.error('Error getting stats:', error);
    }
  }

  async getOpinions() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getOpinions');
      this.opinions = response.data;
      console.log(this.opinions);
    } catch (error) {
      console.error('Error getting opinions:', error);
    }
  }

  async getInterviews() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getInterviews');
      this.interviews = response.data;
      console.log(this.interviews);
    } catch (error) {
      console.error('Error getting interviews:', error);
    }
  }

  async getSpecials() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getSpecials');
      this.specials = response.data;
      console.log(this.specials);
    } catch (error) {
      console.error('Error getting specials:', error);
    }
  }

  async getSpotlights() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getSpotlights');
      this.spotlights = response.data;
      console.log(this.spotlights);
    } catch (error) {
      console.error('Error getting spotlights:', error);
    }
  }

  async getPhotos() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getPhotos');
      this.photos = response.data;
      console.log(this.photos);
    } catch (error) {
      console.error('Error getting photos:', error);
    }
  }
}
