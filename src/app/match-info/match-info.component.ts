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

  currentmatchesdata:any=[];
  playersdata:any=[];
  commdata:any=[];
  scoresheetdata:any=[];

  link:any="";
  linkscorecard:any="";
  linkplayer:any="";
  linkcommentry:any="";
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
      this.link=params['cricket']+"/"+params['vs']+"/"+params['match']+"/"+params["scorecard"]+"/"+params['id']
      this.linkscorecard=params['cricket']+"/"+params['vs']+"/"+params['match']+"/"+"scorecard"+"/"+params['id']
      this.linkcommentry=params['cricket']+"/"+params['vs']+"/"+params['match']+"/"+"commentary"+"/"+params['id']
      this.linkplayer=params['cricket']+"/"+params['vs']+"/"+params['match']+"/"+"players"+"/"+params['id']
      this.state=params['state']=="Live"?"Live":"Completed"
      this.ind=params['index'];
    });
}

  ngOnInit(): void {
    this.apiscoresheet(this.linkscorecard);
    this.apiplayers(this.linkplayer)
    this.apiCommentry(this.linkcommentry)
    if(this.state == "Live")
    {
      this.apilive();
    }
    if(this.state == "Completed")
    {
      this.apiresult()
    }
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


  async apilive(): Promise<void> {
    try {
      const response: AxiosResponse<any> = await axios.get('https://cricket-api-nu.vercel.app/getLive');
      this.currentmatchesdata = await response.data[this.ind];
      this.getFlag(this.currentmatchesdata.teamA).then((flag) => {
        this.currentmatchesdata.flagA=flag;
      });
      this.getFlag(this.currentmatchesdata.teamB).then((flag) => {
        this.currentmatchesdata.flagB=flag;
      });
    
      console.log(this.currentmatchesdata)
      this.score=true;
    } catch (error) {
      console.error(error);
    }
  }

  async apiresult(): Promise<void> {
    try {
      const response: AxiosResponse<any> = await axios.get('https://cricket-api-nu.vercel.app/getRecent');
      this.currentmatchesdata = await response.data[this.ind];
      this.getFlag(this.currentmatchesdata.teamA).then((flag) => {
        this.currentmatchesdata.flagA=flag;
      });
      this.getFlag(this.currentmatchesdata.teamB).then((flag) => {
        this.currentmatchesdata.flagB=flag;
      });

    } catch (error) {
      console.error(error);
    }
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


  
  



}
