import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.scss']
})
export class RankingsComponent implements OnInit {
  battingrankings:any=[];
  bowlingrankings:any=[];
  allrounderrankings:any=[];
  teamrankings:any=[];



  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getbattingrankings();
    this.getbowlingrankings();
    this.getallrounderrankings();
    this.getteamrankings();
    
  }

  goToRanking() {
    this.router.navigate(['/', 'Rankings']);
  }

  getbattingrankings(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/battingrankings',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.battingrankings=response.data;
      console.log(this.battingrankings);
    }).catch(function (error) {
      console.error(error);
    });
  }


  getbowlingrankings(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/bowlingrankings',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.bowlingrankings=response.data;
      console.log(this.bowlingrankings);
    }).catch(function (error) {
      console.error(error);
    });
  }


  getallrounderrankings(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/allrounderrankings',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.allrounderrankings=response.data;
    }).catch(function (error) {
      console.error(error);
    });
  }


  getteamrankings(){
    const options = {
      method: 'GET',
      url: 'https://cricgeek.p.rapidapi.com/teamsrankings',
      headers: {
        'X-RapidAPI-Key': '5c7e26a218msh8f28315cf99f5a1p1fa374jsnc011c056761c',
        'X-RapidAPI-Host': 'cricgeek.p.rapidapi.com'
      }
    };
    
    axios.request(options).then( (response) => {
      this.teamrankings=response.data;
    }).catch(function (error) {
      console.error(error);
    });
  }

}
