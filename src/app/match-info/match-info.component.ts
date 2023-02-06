import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

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
  eleven=[0,1,2,3,4,5,6,7,8,9,10]
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
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      this.type=params['type']
      this.id=params['id']
      this.matchName=params['match']
      this.link="/"+params['type']+"/"+params['id']+"/"+params['match']
    });
}

  ngOnInit(): void {
    this.apiscoresheet(this.link)
    
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
      this.currentmatchesdata=response.data.filter( (item:any) => this.scoresheetdata[0].title.includes(item.teams[0])&&this.scoresheetdata[0].title.includes(item.teams[1]));
      console.log(this.currentmatchesdata);
      this.datalodedlive=true;
      this.row=true;
      this.score=false;

    }).catch(function (error) {
      console.error(error);
    });
  }



  

  apiscoresheet(url:any)
  {

    const options = {
      method: 'GET',
      url: `https://cricgeek.p.rapidapi.com/info/${this.id}`,
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.scoresheetdata=response.data;
      this.apilive()
      console.log(this.scoresheetdata);
      for(let i=0; i<this.scoresheetdata[0].innings1.length; i+=7) {
        if(this.scoresheetdata[0].innings1[i].includes("Bowler")||this.scoresheetdata[0].innings1[i].includes("Extras")||this.scoresheetdata[0].innings1[i].includes(" Yet to Bat "))
        {
          break;
        }
        if(this.scoresheetdata[0].innings1[i]!="Bowler"&&this.scoresheetdata[0].innings1[i].length<40)
        {
          this.innings1bat.push([
            this.scoresheetdata[0].innings1[i],
            this.scoresheetdata[0].innings1[i+1],
            this.scoresheetdata[0].innings1[i+2],
            this.scoresheetdata[0].innings1[i+3],
            this.scoresheetdata[0].innings1[i+4],
            this.scoresheetdata[0].innings1[i+5],
            this.scoresheetdata[0].innings1[i+6],
          ])
        }
      }

      for(let i=0;i<this.scoresheetdata[0].innings1.length;i++)
      {
        if(this.scoresheetdata[0].innings1[i]=="Bowler")
        {
            this.breakpointsinng1=i;
            break;
        }
      }


      for(let i=this.breakpointsinng1; i<this.scoresheetdata[0].innings1.length; i+=8) {
 
          this.innings1bowl.push([
            this.scoresheetdata[0].innings1[i],
            this.scoresheetdata[0].innings1[i+1],
            this.scoresheetdata[0].innings1[i+2],
            this.scoresheetdata[0].innings1[i+3],
            this.scoresheetdata[0].innings1[i+4],
            this.scoresheetdata[0].innings1[i+5],
            this.scoresheetdata[0].innings1[i+6],
            this.scoresheetdata[0].innings1[i+7],
          ])
      }

      console.log(this.innings1bat);
      console.log(this.innings1bowl);


      for(let i=0; i<this.scoresheetdata[0].innings2.length; i+=7) {
        if(this.scoresheetdata[0].innings2[i].includes("Bowler")||this.scoresheetdata[0].innings2[i].includes("Extras")||this.scoresheetdata[0].innings2[i].includes(" Yet to Bat "))
        {
          break;
        }
        if(this.scoresheetdata[0].innings2[i]!="Bowler")
        {
          this.innings2bat.push([
            this.scoresheetdata[0].innings2[i],
            this.scoresheetdata[0].innings2[i+1],
            this.scoresheetdata[0].innings2[i+2],
            this.scoresheetdata[0].innings2[i+3],
            this.scoresheetdata[0].innings2[i+4],
            this.scoresheetdata[0].innings2[i+5],
            this.scoresheetdata[0].innings2[i+6],
          ])
        }
      }

      for(let i=0;i<this.scoresheetdata[0].innings2.length;i++)
      {
        if(this.scoresheetdata[0].innings2[i]=="Bowler")
        {
            this.breakpointsinng2=i;
            break;
        }
      }


      for(let i=this.breakpointsinng2; i<this.scoresheetdata[0].innings2.length; i+=8) {
 
          this.innings2bowl.push([
            this.scoresheetdata[0].innings2[i],
            this.scoresheetdata[0].innings2[i+1],
            this.scoresheetdata[0].innings2[i+2],
            this.scoresheetdata[0].innings2[i+3],
            this.scoresheetdata[0].innings2[i+4],
            this.scoresheetdata[0].innings2[i+5],
            this.scoresheetdata[0].innings2[i+6],
            this.scoresheetdata[0].innings2[i+7],
          ])
      }

      console.log(this.innings2bat);
      console.log(this.innings2bowl);


      for(let i=0; i<this.scoresheetdata[0].innings3.length; i+=7) {
        if(this.scoresheetdata[0].innings3[i].includes("Bowler")||this.scoresheetdata[0].innings3[i].includes("Extras")||this.scoresheetdata[0].innings3[i].includes(" Yet to Bat "))
        {
          break;
        }
        if(this.scoresheetdata[0].innings3[i]!="Bowler")
        {
          this.innings3bat.push([
            this.scoresheetdata[0].innings3[i],
            this.scoresheetdata[0].innings3[i+1],
            this.scoresheetdata[0].innings3[i+2],
            this.scoresheetdata[0].innings3[i+3],
            this.scoresheetdata[0].innings3[i+4],
            this.scoresheetdata[0].innings3[i+5],
            this.scoresheetdata[0].innings3[i+6],
          ])
        }
      }

      for(let i=0;i<this.scoresheetdata[0].innings3.length;i++)
      {
        if(this.scoresheetdata[0].innings3[i]=="Bowler")
        {
            this.breakpointsinng3=i;
            break;
        }
      }


      for(let i=this.breakpointsinng3; i<this.scoresheetdata[0].innings3.length; i+=8) {
 
          this.innings3bowl.push([
            this.scoresheetdata[0].innings3[i],
            this.scoresheetdata[0].innings3[i+1],
            this.scoresheetdata[0].innings3[i+2],
            this.scoresheetdata[0].innings3[i+3],
            this.scoresheetdata[0].innings3[i+4],
            this.scoresheetdata[0].innings3[i+5],
            this.scoresheetdata[0].innings3[i+6],
            this.scoresheetdata[0].innings3[i+7],
          ])
      }

      console.log(this.innings3bat);
      console.log(this.innings3bowl);

      for(let i=0; i<this.scoresheetdata[0].innings4.length; i+=7) {
        if(this.scoresheetdata[0].innings4[i].includes("Bowler")||this.scoresheetdata[0].innings4[i].includes("Extras")||this.scoresheetdata[0].innings4[i].includes(" Yet to Bat "))
        {
          break;
        }
        if(this.scoresheetdata[0].innings4[i]!="Bowler")
        {
          this.innings4bat.push([
            this.scoresheetdata[0].innings4[i],
            this.scoresheetdata[0].innings4[i+1],
            this.scoresheetdata[0].innings4[i+2],
            this.scoresheetdata[0].innings4[i+3],
            this.scoresheetdata[0].innings4[i+4],
            this.scoresheetdata[0].innings4[i+5],
            this.scoresheetdata[0].innings4[i+6],
          ])
        }
      }

      for(let i=0;i<this.scoresheetdata[0].innings4.length;i++)
      {
        if(this.scoresheetdata[0].innings4[i]=="Bowler")
        {
            this.breakpointsinng4=i;
            break;
        }
      }


      for(let i=this.breakpointsinng3; i<this.scoresheetdata[0].innings4.length; i+=8) {
 
          this.innings4bowl.push([
            this.scoresheetdata[0].innings4[i],
            this.scoresheetdata[0].innings4[i+1],
            this.scoresheetdata[0].innings4[i+2],
            this.scoresheetdata[0].innings4[i+3],
            this.scoresheetdata[0].innings4[i+4],
            this.scoresheetdata[0].innings4[i+5],
            this.scoresheetdata[0].innings4[i+6],
            this.scoresheetdata[0].innings4[i+7],
          ])
      }

      console.log(this.innings4bat);
      console.log(this.innings4bowl);


      


      

      this.datascoresheets=true;
      this.score=true;
      this.row=false;

    }).catch(function (error) {
      console.error(error);
    });
    
  }

  goback()
  {
   
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
