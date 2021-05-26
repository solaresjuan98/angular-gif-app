import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'kYl48IbVuBlgOXjDpXr7Ddn2yOpOKr5A';
  private urlService: string = 'https://api.giphy.com/v1/gifs';
  private _searchHistory: string[] = [];

  public results: any[] = [];

  get searchHistory() {
    return [...this._searchHistory];
  }

  constructor(private http: HttpClient) {
    localStorage.getItem('searchHistory');
    this._searchHistory =
      JSON.parse(localStorage.getItem('searchHistory')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs(query: string = '') {
    query = query.trim().toLocaleLowerCase();

    if (!this._searchHistory.includes(query)) {
      this._searchHistory.unshift(query);
      // 10 recent searches
      this._searchHistory = this._searchHistory.splice(0, 10);

      localStorage.setItem(
        'searchHistory',
        JSON.stringify(this._searchHistory)
      );
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '15')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.urlService}/search`, { params })
      .subscribe((resp) => {
        console.log(resp.data);
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
        //resp.data[0].images.downsized_medium.url
      });
    //console.log(this._searchHistory);
  }
}
