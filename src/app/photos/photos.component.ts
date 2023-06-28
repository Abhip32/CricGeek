import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios, { AxiosResponse } from 'axios';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})



export class PhotosComponent implements OnInit {
  page:any="";
  photos:any=[];
  nextLink:any="";
  score:boolean=false;
  numbersArray: number[] = [];
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
      this.page=params['page']
      this.nextLink=parseInt(this.page) + 1;

    });
}

  ngOnInit(): void {
    this.generateNumbersArray();
    this.apiPhotos()
  }

  generateNumbersArray(): void {
    for (let i = 1; i <= 40; i++) {
      this.numbersArray.push(i);
    }
  }

  async apiPhotos(): Promise<void> {
    try {
      const response: AxiosResponse<any> = await axios.get('https://cricket-api-nu.vercel.app/getPhotos/'+this.page);
      this.photos=response.data;
      this.score=true;
      console.log(this.photos)
    } catch (error) {
      console.error(error);
    }
  }

}
