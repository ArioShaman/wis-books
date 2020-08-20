import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Author } from '../../authors/models/author.model';


@Injectable({
  providedIn: 'root',
})
export class AuthorsService {

  protected API_URL: string = environment.hosts.api_host;

  constructor(
    private http: HttpClient,
  ) { }

  public getAllAuthors(): Observable<Author[]> {
    return this.http.get(
      this.API_URL + '/authors',
      {
        params: new HttpParams().set('limit', '25'),
      },
    ).pipe(
      map((res: any) => {
        return Author.newCollection(Author, res.authors);
      }),
    );
  }

  public getAuthorById(id: number): Observable<any> {
    return this.http.get(this.API_URL + `/authors/${id}`);
  }

}

