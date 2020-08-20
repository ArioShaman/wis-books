import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Genre } from '../../genres/models/genre.model';

@Injectable({
  providedIn: 'root',
})
export class GenresService {

  protected API_URL: string = environment.hosts.api_host;

  constructor(
    private http: HttpClient,
  ) { }

  public getAllGenres(): Observable<Genre[]> {
    return this.http.get(
      this.API_URL + '/genres',
      {
        params: new HttpParams().set('limit', '30'),
      },
    ).pipe(
      map((res: any) => {
        return Genre.newCollection(Genre, res.genres);
      }),
    );
  }

}
