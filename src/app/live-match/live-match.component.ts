import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-match',
  templateUrl: './live-match.component.html',
  styleUrls: ['./live-match.component.scss']
})
export class LiveMatchComponent implements OnInit {

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

}
