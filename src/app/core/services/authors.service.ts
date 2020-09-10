import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Author } from '../../authors/models/author.model';

interface IResponse {
  authors: Author[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAllAuthors(): Observable<Author[]> {
    const params = {
      params: new HttpParams().set('limit', '50')
    };

    return this.http.get<IResponse>('/authors', params)
      .pipe(map(res => Author.newCollection(Author, res.authors)));
  }

  public getAuthorById(id: number): Observable<Author> {
    return this.http.get(`/authors/${id}`)
      .pipe(map(res => Author.new(Author, res)));
  }

  public deleteAuthor(id: number): Observable<Author> {
    const uri = `/authors/${id}`;

    return this.http.delete(uri)
      .pipe(map(res => Author.new(Author, res)));
  }

  public createAuthor(author: Author): Observable<Author> {
    const uri = '/authors';
    const formData = author._toJSON();

    return this.http.post(uri, formData)
      .pipe(map(res => Author.new(Author, res)));
  }

  public updateAuthor(author: Author): Observable<Author> {
    const uri = `/authors/${author.id}`;
    const formData = author._toJSON();

    return this.http.put(uri, formData)
      .pipe(map(res => Author.new(Author, res)));
  }

}
