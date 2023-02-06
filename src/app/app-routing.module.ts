import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LiveMatchComponent } from './live-match/live-match.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MatchInfoComponent } from './match-info/match-info.component';
import {RankingsComponent} from './rankings/rankings.component'

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'Match_Info', component: MainpageComponent },
  { path: 'Rankings', component: RankingsComponent },
  { path: 'CricGeek/Match/Info/:type/:id/:match', component: MatchInfoComponent },
  { path: 'live', component: LiveMatchComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

