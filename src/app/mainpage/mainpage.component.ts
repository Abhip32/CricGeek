import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  index=false;
  match=true;
  row=false;
  score=false;
  title = 'CricGeek';
  currentmatchesdata:any=[];
  upcomingmatchesdata:any=[];
  resultsdata:any=[];
  scoresheetdata:any=[];
  scoresheetheadings:any=[];
  maindata:any=[];

  scoresheettables:any=[];
  scoresheettables1:any=[];
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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.apilive()
    this.apiresult()
    this.apiupcoming()
  }
  goToIndex() {
    this.index=true;
    this.router.navigate(['/', '/']);
  }

  goToMainPage() {
    this.index=false;
    this.match=true;
    this.router.navigate(['/', 'MainPage']);
  }
  
  apilive(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/live',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.currentmatchesdata=response.data;
      this.datalodedlive=true;
      this.row=true;
      this.score=false;

    }).catch(function (error) {
      console.error(error);
    });
  }


  apiupcoming(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/upcoming',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.upcomingmatchesdata=response.data;
      console.log(this.upcomingmatchesdata)
      this.datalodedupcoming=true;
      this.row=true;
      this.score=false;

    }).catch(function (error) {
      console.error(error);
    });
  }

  apiscoresheet(url:any,time:any,flag0:any,flag1 :any,team0:any,team1:any,titles:any,progress:any,overs0:any,overs1:any)
  {
    console.log(url)
    if(time!=undefined)
    {
      this.timing=time;
    }
    if(titles!=undefined)
    {
      this.mtitle=titles;
    }
    if(flag0!=undefined)
    {
      this.mflag0=flag0;
    }
    if(flag1!=undefined)
    {
      this.mflag1=flag1;
    }
    if(team0!=undefined)
    {
      this.mteam0=team0;
    }
    if(team1!=undefined)
    {
      this.mteam1=team1;
    }
    if(progress!=undefined)
    {
      this.mprogress=progress;
    }

    if(overs0!=undefined)
    {
      this.movers0=overs0;
    }

    if(overs1!=undefined)
    {
      this.movers1=overs1;
    }

    console.log(this.movers0,this.movers1)
    const options = {
      method: 'GET',
      url: `https://cricgeek.p.rapidapi.com${url}`,
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.scoresheetdata=response.data;
      console.log(this.scoresheetdata);
      for(let i=1; i<this.scoresheetdata.length; i++) {
          if(this.scoresheetdata[i].details.includes('R')||this.scoresheetdata[i].details.includes('AVE')||this.scoresheetdata[i].details.includes('Toss'))
          {
            this.scoresheetheadings.push(i)
          }
      }
      let k=0;
      let m=0;
      for(let j=0;j<this.scoresheetheadings.length;  j++)
      {
            
            while(this.scoresheetheadings[j]!=k)
            {
              this.maindata.push(this.scoresheetdata[k].details)
              k++;
            }
            if(this.scoresheetheadings[j]==k)
            {
              this.scoresheettables1.push(this.maindata.slice(m,k))
              m=k
              
            }

      }
      this.scoresheettables=this.maindata
      console.log(this.scoresheettables1)
      this.datascoresheets=true;
      this.score=true;
      this.row=false;

    }).catch(function (error) {
      console.error(error);
    });
    
  }

  goback()
  {
    window.location.reload();
  }
  createRange(number:any){
    // var items: number[] = [];
    // for(var i = 1; i <= number; i++){
    //   items.push(i);
    // }
    // return items;
    return new Array(number);
  }

  isNumeric(num:any){
    return !isNaN(num)
  }


  apiresult(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/results',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.resultsdata=response.data;
      console.log(this.resultsdata)
      this.datalodedresult=true;
      this.row=true;
      this.score=false;

    }).catch(function (error) {
      console.error(error);
    });
  }
}

  



