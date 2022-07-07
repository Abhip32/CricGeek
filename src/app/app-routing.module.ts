import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import {RankingsComponent} from './rankings/rankings.component'

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'Match_Info', component: MainpageComponent },
  { path: 'Rankings', component: RankingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

