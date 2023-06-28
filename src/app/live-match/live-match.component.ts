import { Component, OnInit, Sanitizer } from '@angular/core';

@Component({
  selector: 'app-live-match',
  templateUrl: './live-match.component.html',
  styleUrls: ['./live-match.component.scss']
})
export class LiveMatchComponent implements OnInit {
  event: any; 

  constructor() { }

  ngOnInit(): void {
    
  }



  selectedStream: any = 'https://stream.crichd.vip/update/star.php';

  onStreamSelect(event: Event): void {
    this.selectedStream =  (event.target as HTMLInputElement).value;

  }


}
