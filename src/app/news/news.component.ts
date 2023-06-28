import { Component, OnInit } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newsData:any = [];
  page:string = '';
  score:boolean = false;

  constructor(private route: ActivatedRoute) {    
    this.route.params.subscribe( params => {
    this.page=params['type']

  }); }

  ngOnInit(): void {
    if(this.page=="ICC_News"){
      this.apiICCNews();
      this.page="ICC News"
    }

    if(this.page=="Stats_Facts"){
      this.apiStats();
      this.page="Stats & Facts"
    }
    

  }

  async apiICCNews(): Promise<void> {
    try {
      const response: AxiosResponse<any> = await axios.get('https://cricket-api-nu.vercel.app/newsICC');
      this.newsData=response.data;
      this.score=true;
    } catch (error) {
      console.error(error);
    }
  }

  async apiStats(): Promise<void> {
    try {
      const response: AxiosResponse<any> = await axios.get('https://cricket-api-nu.vercel.app/stats_facts');
      this.newsData=response.data;
      this.score=true;
    } catch (error) {
      console.error(error);
    }
  }

}
