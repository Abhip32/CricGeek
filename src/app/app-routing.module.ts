import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LiveMatchComponent } from './live-match/live-match.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MatchInfoComponent } from './match-info/match-info.component';
import {RankingsComponent} from './rankings/rankings.component'
import { SchdulepageComponent } from './schdulepage/schdulepage.component';
import { ExtraComponent } from './extra/extra.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'Match_Info', component: MainpageComponent },
  { path: 'Rankings', component: RankingsComponent },
  { path: 'Scorecard', component: MatchInfoComponent },
  { path: 'Live', component: LiveMatchComponent },
  { path: 'Schdule', component: SchdulepageComponent },
  { path: 'Extra', component: ExtraComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

