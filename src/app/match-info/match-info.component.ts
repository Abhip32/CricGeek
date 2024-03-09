import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios, { AxiosResponse } from 'axios';

@Component({
  selector: 'app-match-info',
  templateUrl: './match-info.component.html',
  styleUrls: ['./match-info.component.scss']
})

export class MatchInfoComponent implements OnInit {
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
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      this.type=params['type']
      this.id=params['id']
      this.matchName=params['match']
  
      this.linkscorecard=params['detail']+"/"+params['id']+"/"+params['type']+"/"+params['match']
      this.linkcommentry=params['detail']+"/"+params['id']+"/"+"commentary"+"/"+params['match']
      this.linkplayer=params['detail']+"/"+params['id']+"/"+"squad"+"/"+params['match']
      this.linkinfo=params['detail']+"/"+params['id']+"/"+"info"+"/"+params['match']

      this.state=params['state']=="Live"?"Live":"Completed"
      this.ind=params['index'];
    });
}

  ngOnInit(): void {
    this.apiscoresheet(this.linkscorecard);
    this.apiplayers(this.linkplayer)
    this.apiCommentry(this.linkcommentry)
    this.apiinfo(this.linkinfo);
  }









  apiscoresheet(url:any)
  {

    const options = {
      method: 'GET',
      url: `https://cricket-api-nu.vercel.app/getScoreCard/${url}`,
    };
    
    axios.request(options).then( (response) => {
      this.scoresheetdata=response.data;
      
      console.log(this.scoresheetdata);
      this.score=true;
        

    }).catch(function (error) {
      console.error(error);
    });
    
  }


  apiplayers(url:any)
  {

    const options = {
      method: 'GET',
      url: `https://cricket-api-nu.vercel.app/getScoreCard/${url}`,
    };
    
    axios.request(options).then( (response) => {
      this.playersdata=response.data;
      console.log(this.playersdata);
      this.score=true;
        

    }).catch(function (error) {
      console.error(error);
    });
    
  }

  apiCommentry(url:any){
    const options = {
      method: 'GET',
      url: `https://cricket-api-nu.vercel.app/getScoreCard/${url}`,
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
      url: `https://cricket-api-nu.vercel.app/getScoreCard/${url}`,
    };
    
    axios.request(options).then( (response) => {
      this.infodata=response.data;
      console.log(this.infodata);
      this.score=true;
        

    }).catch(function (error) {
      console.error(error);
    });
  }


  
  



}
