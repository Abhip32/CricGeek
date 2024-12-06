import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.scss']
})
export class ExtraComponent implements OnInit {

  score = false;
  scoress=false;
  title = 'CricGeek';

  news: any = [];
  newss: any = [];
  newsplus: any = [];
  stats: any = [];
  specials: any = [];
  opinions: any = [];
  spotlights: any = [];
  interviews: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getNews();
    this.getNewsPlus();
    this.getInterviews();
    this.getOpinions();
    this.getSpecials();
    this.getStats();
    this.getSpotlights();

  }

  async getNewss() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getNewss');
      this.newss = response.data.filter((news: any) => news.Images !== undefined);
      this.scoress = true;
    } catch (error) {
      console.error('Error getting news:', error);
    }
  }

  async getNews() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getNews');
      this.news = response.data.filter((news: any) => news.Images !== undefined);
      this.score = true;
    } catch (error) {
      console.error('Error getting news:', error);
    }
  }

  async getNewsPlus() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getNewsPlus');
      this.newsplus = response.data.filter((news: any) => news.Images !== undefined);
      console.log(this.newsplus);
    } catch (error) {
      console.error('Error getting additional news:', error);
    }
  }

  async getStats() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getStats');
      this.stats = response.data.filter((news: any) => news.Images !== undefined);
      console.log(this.stats);
    } catch (error) {
      console.error('Error getting stats:', error);
    }
  }

  async getOpinions() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getOpinions');
      this.opinions = response.data.filter((news: any) => news.Images !== undefined);
      console.log(this.opinions);
    } catch (error) {
      console.error('Error getting opinions:', error);
    }
  }

  async getInterviews() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getInterviews');
      this.interviews = response.data.filter((news: any) => news.Images !== undefined);
      console.log(this.interviews);
    } catch (error) {
      console.error('Error getting interviews:', error);
    }
  }

  async getSpecials() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getSpecials');
      this.specials = response.data.filter((news: any) => news.Images !== undefined);
      console.log(this.specials);
    } catch (error) {
      console.error('Error getting specials:', error);
    }
  }

  async getSpotlights() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getSpotlights');
      this.spotlights = response.data.filter((news: any) => news.Images !== undefined);
      console.log(this.spotlights);
    } catch (error) {
      console.error('Error getting spotlights:', error);
    }
  }



}







