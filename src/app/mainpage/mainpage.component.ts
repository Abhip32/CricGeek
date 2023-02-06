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
  allmatchesdata:any=[];
  currentmatchesdata1:any=[];
  currentmatchesdata2:any=[];
  upcomingmatchesdata:any=[];
  resultsdata:any=[];
  scoresheetdata:any=[];
  scoresheetheadings:any=[];
  maindata:any=[];
  schdule:any=[];
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
    this.apilive1()
    this.apiresult()
    this.apiresult1()
    this.apischdule()
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


  apischdule(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/schdule',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.schdule=response.data;
      this.datalodedlive=true;
      this.row=true;
      this.score=false;

    }).catch(function (error) {
      console.error(error);
    });
  }



  apilive1(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/live1',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.currentmatchesdata1=response.data;
      this.allmatchesdata=this.allmatchesdata.concat(this.currentmatchesdata1)
      this.datalodedlive=true;
      this.row=true;
      this.score=false;

    }).catch(function (error) {
      console.error(error);
    });
  }


  apiresult1(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/recent1',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.currentmatchesdata2=response.data;
      this.allmatchesdata=this.allmatchesdata.concat(this.currentmatchesdata2)
      console.log(this.allmatchesdata);
      this.datalodedlive=true;
      this.row=true;
      this.score=false;

    }).catch(function (error) {
      console.error(error);
    });
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

  



