import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LiveMatchComponent } from './live-match/live-match.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MatchInfoComponent } from './match-info/match-info.component';
import {RankingsComponent} from './rankings/rankings.component'
import { SchdulepageComponent } from './schdulepage/schdulepage.component';
import { PhotosComponent } from './photos/photos.component';
import { NewsComponent } from './news/news.component';
import { ExtraComponent } from './extra/extra.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'Match_Info', component: MainpageComponent },
  { path: 'Rankings', component: RankingsComponent },
  { path: 'Match/:state/:index/Info/:cricket/:vs/:match/:type/:id', component: MatchInfoComponent },
  { path: 'Live', component: LiveMatchComponent },
  { path: 'Schdule', component: SchdulepageComponent },
  { path: 'Photos/:page', component: PhotosComponent },
  { path: 'News/:type', component: NewsComponent },
  { path: 'Extra', component: ExtraComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

