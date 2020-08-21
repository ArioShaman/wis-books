import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Genre } from '../../genres/models/genre.model';

interface IResponse {
  genres: Genre[];
}

@Injectable({
  providedIn: 'root',
})
export class GenresService {

  constructor(
    private http: HttpClient,
  ) { }

  public getAllGenres(): Observable<Genre[]> {
    const params = {
      params: new HttpParams().set('limit', '30'),
    };

    return this.http.get<IResponse>('/genres', params)
      .pipe(
        map(res => Genre.newCollection(Genre, res.genres)),
      );
  }

}
