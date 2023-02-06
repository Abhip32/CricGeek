import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
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
  

  news:any=[];
  newsplus:any=[];
  stats:any=[];
  specials:any=[];
  opinions:any=[];
  spotlights:any=[];
  interviews:any=[];
  photos:any=[];


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
    this.apinews()
    this.apinewsplus()
    this.apispecials()
    this.apistats()
    this.apiopinions()
    this.apiinterviews()
    this.apispotlight()
    this.apiPhotos()

  }
  goToIndex() {
    this.router.navigate(['/', 'Home']);
  }

  goToMainPage() {
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
      console.log(this.currentmatchesdata)
      this.datalodedlive=true;
      this.row=true;
      this.score=false;

    }).catch(function (error) {
      console.error(error);
    });
  }



  apinews(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/news',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.news=response.data;
      this.apinewsplus()

    }).catch(function (error) {
      console.error(error);
    });
  }

  apinewsplus(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/newsplus',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.newsplus=response.data;
      console.log(this.newsplus)

    }).catch(function (error) {
      console.error(error);
    });
  }
  
  apistats(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/stats',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.stats=response.data;
      console.log(this.stats)

    }).catch(function (error) {
      console.error(error);
    });
  }


  apiinterviews(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/interviews',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.interviews=response.data;
      console.log(this.interviews)

    }).catch(function (error) {
      console.error(error);
    });
  }

  apispecials(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/specials',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.specials=response.data;
      console.log(this.specials)

    }).catch(function (error) {
      console.error(error);
    });
  }

  apiopinions(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/opinions',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.opinions=response.data;
      console.log(this.opinions)

    }).catch(function (error) {
      console.error(error);
    });
  }

  apispotlight(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/spotlight',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.spotlights=response.data;
      console.log(this.spotlights)

    }).catch(function (error) {
      console.error(error);
    });
  }

  apiPhotos(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/photos',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.photos=response.data;
      console.log(this.spotlights)

    }).catch(function (error) {
      console.error(error);
    });
    
  }
}


