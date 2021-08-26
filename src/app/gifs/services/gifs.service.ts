import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey = ''; // ingresar su api_key
  private serviceUrl = 'https://api.giphy.com/v1/gifs';
  private _record: string[] = [];

  public results: Gif[] = [];

  get record():string[] {
    return [...this._record];
  }

  constructor(private http: HttpClient) {
    this._record = JSON.parse(localStorage.getItem('record')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs(query: string){
    
    query = query.trim().toLocaleLowerCase();
    
    if(!this._record.includes(query)){
      this._record.unshift(query);
      this._record = this._record.splice(0, 10);

      localStorage.setItem('record', JSON.stringify(this._record));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe( (resp) => {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
