import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  baseUrl = 'https://api.tenor.com/v1/';

  constructor(private http: HttpClient) { }

  getTrending(): Observable<any> {
    return this.http.get(`${this.baseUrl}trending?platform=web&key=JJHDC7UK73EH&locale=en&anonid=MTkyMzgzMDY2NA&limit=20`);
  }

  getAutoSuggestion(keyword: string | number): Observable<any> {
    return this.http.get(`${this.baseUrl}autocomplete?q=${keyword}&key=LIVDSRZULELA&limit=10`);
  }

  getSearchGif(item: string): Observable<any> {
    return this.http.get(`${this.baseUrl}search?platform=web&key=JJHDC7UK73EH&locale=en&anonid=MTkyMzgzMDY2NA&tag=${item}&limit=20`);
  }
}


