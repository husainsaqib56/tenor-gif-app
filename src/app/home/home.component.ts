import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { IGifModel, IGifResultModel } from '../app.model';
import { TrendingService } from '../services/trending.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() mydata: string;
  heading = 'Trending';
  gifData: IGifResultModel[];
  searchHome = '';
  showGIF = false;
  unsubscribe: Subscription;

  constructor(private apiService: TrendingService) { }

  ngOnInit(): void {
    this.searchHome = this.mydata;
    this.showGif();
  }

  ngOnChanges(): void {
    this.searchHome = this.mydata;
    if (this.searchHome !== undefined && this.searchHome !== '') {
      this.searchgif(this.searchHome);
      this.showGif();
    }
  }

  // render Gifs after 2 seconds
  showGif(): void {
    const root = this;
    setTimeout(() => {
      root.showGIF = true;
    }, 2000);
  }

  searchgif(item: string): void {
    this.showGIF = false;
    this.unsubscribe = this.apiService.getSearchGif(item)
      .subscribe((data: IGifModel) => {
        this.gifData = data.results;
        this.heading = `Your Search "${item}"`;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }

}
