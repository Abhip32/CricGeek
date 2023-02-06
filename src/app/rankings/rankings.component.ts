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
  testbat:any=[];
  onebat:any=[];
  t20bat:any=[];

  testbowl:any=[];
  onebowl:any=[];
  t20bowl:any=[];


  testal:any=[];
  oneal:any=[];
  t20al:any=[];

  batbreak=0;
  ballbreak=0;
  fieldbreak=0;
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
      this.testbat.push(this.battingrankings[0])
      for(var i=1;i<this.battingrankings.length;i++){
        if(this.battingrankings[i].index=='1')
        {
          this.batbreak=i;
          break;
        }
        else
        {
          this.testbat.push(this.battingrankings[i]);
        }
      }
      this.onebat.push(this.battingrankings[this.batbreak])
      for(var i=this.batbreak+1;i<this.battingrankings.length;i++){
        if(this.battingrankings[i].index=='1')
        {
          this.batbreak=i;
          break;
        }
        else
        {
          this.onebat.push(this.battingrankings[i]);
        }
      }

      this.t20bat.push(this.battingrankings[this.batbreak])
      for(var i=this.batbreak+1;i<this.battingrankings.length;i++){
        if(this.battingrankings[i].index=='1')
        {
          this.batbreak=i;
          break;
        }
        else
        {
          this.t20bat.push(this.battingrankings[i]);
        }
      }
      

      console.log(this.t20bat);
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
 
      this.testbowl.push(this.bowlingrankings[0])
      for(var i=1;i<this.bowlingrankings.length;i++){
        if(this.bowlingrankings[i].index=='1')
        {
          this.ballbreak=i;
          break;
        }
        else
        {
          this.testbowl.push(this.bowlingrankings[i]);
        }
      }
      this.onebowl.push(this.bowlingrankings[this.ballbreak])
      for(var i=this.ballbreak+1;i<this.bowlingrankings.length;i++){
        if(this.bowlingrankings[i].index=='1')
        {
          this.ballbreak=i;
          break;
        }
        else
        {
          this.onebowl.push(this.bowlingrankings[i]);
        }
      }

      this.t20bowl.push(this.bowlingrankings[this.ballbreak])
      for(var i=this.ballbreak+1;i<this.bowlingrankings.length;i++){
        if(this.bowlingrankings[i].index=='1')
        {
          this.ballbreak=i;
          break;
        }
        else
        {
          this.t20bowl.push(this.bowlingrankings[i]);
        }
      }
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

      this.testal.push(this.allrounderrankings[0])
      for(var i=1;i<this.allrounderrankings.length;i++){
        if(this.allrounderrankings[i].index=='1')
        {
          this.fieldbreak=i;
          break;
        }
        else
        {
          this.testal.push(this.allrounderrankings[i]);
        }
      }
      this.oneal.push(this.allrounderrankings[this.fieldbreak])
      for(var i=this.fieldbreak+1;i<this.allrounderrankings.length;i++){
        if(this.allrounderrankings[i].index=='1')
        {
          this.fieldbreak=i;
          break;
        }
        else
        {
          this.oneal.push(this.allrounderrankings[i]);
        }
      }

      this.t20al.push(this.allrounderrankings[this.ballbreak])
      for(var i=this.fieldbreak+1;i<this.allrounderrankings.length;i++){
        if(this.allrounderrankings[i].index=='1')
        {
          this.fieldbreak=i;
          break;
        }
        else
        {
          this.t20al.push(this.allrounderrankings[i]);
        }
      }
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
