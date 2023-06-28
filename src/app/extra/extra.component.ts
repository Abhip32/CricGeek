import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.scss']
})
export class ExtraComponent implements OnInit {

  score = false;
  title = 'CricGeek';

  news: any = [];
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


  async getNews() {
    try {
      const response = await axios.get('https://cricket-api-nu.vercel.app/getNews');
      this.news = response.data;
      this.score=true
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



}







