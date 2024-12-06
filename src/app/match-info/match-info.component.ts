import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios, { AxiosResponse } from 'axios';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.scss']
})

export class MatchInfoComponent implements OnInit {
  url:string=''
  index=false;
  match=true;
  row=false;
  score=false;
  title = 'CricGeek';
  matchData:any=[];
  batting1:any=[];
  batting2:any=[];

  bowling1:any=[];
  bowling2:any=[];

  fow1:any=[];
  fow2:any=[];

  currentmatchesdata:any=[];
  playersdata:any=[];
  commdata:any=[];
  infodata:any=[];
  scoresheetdata:any=[];

  link:any="";
  linkscorecard:any="";
  linkplayer:any="";
  linkcommentry:any="";
  linkinfo:any="";
  state:any="";
  ind:any="";

  type:any;
  id:any;
  matchName:any;
  rawmatchesdata: any;
  scorecarddata:any=[];
  squadsdata:any=[];
  matchnewsdata:any=[];
  constructor(private route: ActivatedRoute) {
 
    
    this.route.queryParams.subscribe(params => {

      this.url = params['url'];
      if (this.url) {        
        this.apiscoresheet(this.url);
        this.apiCommentry(this.url);
        this.apiinfo(this.url);
      } else {
        console.error('URL parameter is undefined');
      }
    });
  }

  ngOnInit(): void {
    this.apiscoresheet(this.url);
    this.apiCommentry(this.url)
    this.apiinfo(this.url);
    this.getSquads(this.url);
    this.getMatchNews(this.url);
  }









  apiscoresheet(url:any)
  {

    const options = {
      method: 'GET',
      url: `https://cricket-api-nu.vercel.app/getScorecard?url=${url}`,
    };
    
    axios.request(options).then( (response) => {
      this.scoresheetdata=response.data;
      
      console.log(this.scoresheetdata);
      this.score=true;
        

    }).catch(function (error) {
      console.error(error);
    });
    
  }


  apiCommentry(url:any){
    const options = {
      method: 'GET',
      url: `https://cricket-api-nu.vercel.app/getCommentary?url=${url}`,
    };
    
    axios.request(options).then( (response) => {
      this.commdata=response.data;
      console.log(this.commdata);
      this.score=true;
        

    }).catch(function (error) {
      console.error(error);
    });

  }

  apiinfo(url:any){
    const options = {
      method: 'GET',
      url: `https://cricket-api-nu.vercel.app/getMiniScorecard?url=${url}`,
    };
    
    axios.request(options).then( (response) => {
      this.scorecarddata=response.data;
      console.log(this.infodata);
      this.score=true;
        

    }).catch(function (error) {
      console.error(error);
    });
  }


  getSquads(url: any) {
    const options = {
      method: 'GET',
      url: `https://cricket-api-nu.vercel.app/getSquads?url=${url}`,
    };

    axios.request(options).then((response) => {
      this.squadsdata = response.data;
      console.log(this.squadsdata);
      this.score = true;
    }).catch(function (error) {
      console.error(error);
    });
  }

  getMatchNews(url: any) {
    const options = {
      method: 'GET',
      url: `https://cricket-api-nu.vercel.app/getMatchNews?url=${url}`,
    };

    axios.request(options).then((response) => {
      this.matchnewsdata = response.data;
      console.log(this.matchnewsdata);
      this.score = true;
    }).catch(function (error) {
      console.error(error);
    });
  }
  



}
