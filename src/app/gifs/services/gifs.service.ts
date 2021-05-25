import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'kYl48IbVuBlgOXjDpXr7Ddn2yOpOKr5A';
  private _searchHistory: string[] = [];

  get searchHistory() {
    // 10 recent searches
    // this._searchHistory = this._searchHistory.splice(0, 10);
    return [...this._searchHistory];
  }

  constructor(private http: HttpClient) {}

  searchGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();

    if (!this._searchHistory.includes(query)) {
      this._searchHistory.unshift(query);
      // 10 recent searches
      this._searchHistory = this._searchHistory.splice(0, 10);
    }

    this.http
      .get(
        'https://api.giphy.com/v1/gifs/search?api_key=kYl48IbVuBlgOXjDpXr7Ddn2yOpOKr5A&q=real madrid&limit=15'
      )
      .subscribe((resp: any) => {
        console.log(resp.data);
      });
    //console.log(this._searchHistory);
  }
}
