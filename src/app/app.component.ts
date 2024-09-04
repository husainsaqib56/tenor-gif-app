import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrendingService } from './services/trending.service';
import { IGifResultModel, IGifModel } from './app.model';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  trendGif: IGifResultModel[];
  sugResult: IGifResultModel[];
  search = '';
  searchVal = '';
  searchedGif = false;
  viewTrendGif = true;
  showSuggestion = false;
  unsubscribe: Subscription;

  constructor(
    private apiService: TrendingService,
    private titleService: Title
  ) {
    this.titleService.setTitle(`Tenor Gif`);
  }


  ngOnInit(): void {
    this.apiService.getTrending().subscribe((res: IGifModel) => {
      this.trendGif = res.results;
    });
  }

  // get length of word typed in searchInputField
  getKeyCode = (str: string) => {
    return str.charCodeAt(str.length);
  };

  // get Suggestion on typed Input
  getAutoSuggestion(event: any): void {
    let charKeyCode = event.keyCode || event.which;
    if (charKeyCode === 48 || charKeyCode === 122) {
      charKeyCode = this.getKeyCode(this.search);
    }
    if (charKeyCode === 13) {
      this.searchVal = this.search;
    }

    this.unsubscribe = this.apiService
      .getAutoSuggestion(this.search)
      .subscribe((response: IGifModel) => {
        this.sugResult = response.results;
        if (this.sugResult.length > 0) {
          this.showSuggestion = true;
        } else if (this.sugResult.length === 0 && this.search === '') {
          this.showSuggestion = false;
        } else {
          this.showSuggestion = false;
        }
      });
  }

  // checks at every interval value of searchInputField
  onTextChange(value: string): void {
    this.search = value;
    setTimeout(() => {
      this.search !== ''
        ? (this.showSuggestion = true)
        : (this.showSuggestion = false);
    }, 1000);
  }

  searchValue(item: string): void {
    this.searchVal = item;
    this.search = item;
    this.showSuggestion = false;
    this.searchedGif = true;
    this.viewTrendGif = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
