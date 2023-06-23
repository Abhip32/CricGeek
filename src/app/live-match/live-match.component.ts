import { Component, OnInit } from '@angular/core';

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

  hideIframe(): void {
    var iframe = document.getElementById("myFrame1") as HTMLIFrameElement;
    iframe.style.display = "none";
    iframe.onload = function() {
      // Do nothing
    };
    iframe.onerror = function() {
      iframe.style.display = "none";
    };

    var iframe = document.getElementById("myFrame2") as HTMLIFrameElement;
    iframe.style.display = "none";
    iframe.onload = function() {
      // Do nothing
    };
    iframe.onerror = function() {
      iframe.style.display = "none";
    };

    var iframe = document.getElementById("myFrame3") as HTMLIFrameElement;
    iframe.style.display = "none";
    iframe.onload = function() {
      // Do nothing
    };
    iframe.onerror = function() {
      iframe.style.display = "none";
    };

    var iframe = document.getElementById("myFrame4") as HTMLIFrameElement;
    iframe.style.display = "none";
    iframe.onload = function() {
      // Do nothing
    };
    iframe.onerror = function() {
      iframe.style.display = "none";
    };
  }

  selectedStream: string = 'https://stream.crichd.vip/update/star1hi.php';

  onStreamSelect(event: Event): void {
    this.selectedStream =  (event.target as HTMLInputElement).value;
    // ... rest of your code
  }


}
