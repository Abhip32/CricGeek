import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RankingsComponent } from './rankings/rankings.component';
import { MatchInfoComponent } from './match-info/match-info.component';
import { LiveMatchComponent } from './live-match/live-match.component';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    HomepageComponent,
    RankingsComponent,
    MatchInfoComponent,
    LiveMatchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
