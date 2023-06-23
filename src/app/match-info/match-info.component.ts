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
  currentmatchesdata1:any=[];
  upcomingmatchesdata:any=[];
  resultsdata:any=[];
  scoresheetdata:any=[];
  scoresheetheadings:any=[];
  maindata:any=[];
  innings1:any=[];
  innings2:any=[];
  innings3:any=[];
  innings4:any=[];
  breakpointsinng1=0;
  breakpointsinng2=0;
  breakpointsinng3=0;
  breakpointsinng4=0;

  innings1bat:any=[];
  innings2bat:any=[];
  innings3bat:any=[];
  innings4bat:any=[];

  innings1bowl:any=[];
  innings2bowl:any=[];
  innings3bowl:any=[];
  innings4bowl:any=[];



  scoresheettables:any=[];
  scoresheettables1:any=[];
  scoresheettables2:any=[];
  datalodedlive=false;
  datalodedresult=false;
  datalodedupcoming=false;
  datascoresheets=false;
  mflag0:any=''
  mteam0:any=''
  mflag1:any=''
  mteam1:any=''
  mtitle:any=''
  timing:any='';
  mprogress:any='';
  movers0:any=" ";
  movers1:any=" ";
  link:any="";

  type:any;
  id:any;
  matchName:any;
  rawmatchesdata: any;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      this.type=params['type']
      this.id=params['id']
      this.matchName=params['match']
      this.link=params['type']+"/"+params['id']+"/"+params['match']
    });
}

  ngOnInit(): void {
  this.apiscoresheet(this.link);
  this.apilive(this.link);
  this.apiresult(this.link);
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

  async apilive(url:any): Promise<void> {
    try {
      const response: AxiosResponse<any> = await axios.get('https://cricket-api-nu.vercel.app/getLiveDataFromCricbuzz');
      this.rawmatchesdata = await response.data.filter((data:any) => data.links[0]=="/"+url);
      console.log(this.rawmatchesdata)
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

      this.currentmatchesdata = this.rawmatchesdata;
      if(this.currentmatchesdata.length > 0)
      {
        this.matchData=this.currentmatchesdata;
      }

    } catch (error) {
      console.error(error);
    }
  }

  async apiresult(url:any): Promise<void> {
    try {
      const response: AxiosResponse<any> = await axios.get('https://cricket-api-nu.vercel.app/getRecentDataFromCricbuzz');
      this.resultsdata = await response.data.filter((data:any) => data.links[0]=="/"+url);
      console.log(this.resultsdata)
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

        if(this.resultsdata.length > 0)
        {
          this.matchData=this.resultsdata;
        }
        
      }
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
      this.scoresheetdata=response.data[0];
      console.log(this.scoresheetdata);
      this.datascoresheets=true;
      this.score=true;
      this.row=false;

    }).catch(function (error) {
      console.error(error);
    });
    
  }
  


  createRange(number:any){
    // var items: number[] = [];
    // for(var i = 1; i <= number; i++){
    //   items.push(i);
    // }
    // return items;
    return new Array(number);
  }
}
