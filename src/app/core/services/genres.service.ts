import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Genre } from '../../genres/models/genre.model';

interface IResponse {
  genres: Genre[];
}

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllGenres(): Observable<Genre[]> {
    const params = {
      params: new HttpParams().set('limit', '50')
    };

    return this.http.get<IResponse>('/genres', params)
      .pipe(map(res => Genre.newCollection(Genre, res.genres)));
  }

  public getGenreById(id: number): Observable<Genre> {
    return this.http.get(`/genres/${id}`)
      .pipe(map(res => Genre.new(Genre, res)));
  }

  public deleteGenre(id: number): Observable<Genre> {
    const uri = `/genress/${id}`;

    return this.http.delete(uri)
      .pipe(map(res => Genre.new(Genre, res)));
  }

  public createGenre(genre: Genre): Observable<Genre> {
    const uri = '/genres';
    const formData = genre._toJSON();

    return this.http.post(uri, formData)
      .pipe(map(res => Genre.new(Genre, res)));
  }

  public updateGenre(genre: Genre): Observable<Genre> {
    const uri = `/genres/${genre.id}`;
    const formData = genre._toJSON();

    return this.http.put(uri, formData)
      .pipe(map(res => Genre.new(Genre, res)));
  }
}
