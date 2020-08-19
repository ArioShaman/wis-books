import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Author } from '../../authors/models/author.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthorsService {

  protected API_URL: string = environment.hosts.api_host;

  constructor(
    private http: HttpClient,
  ) { }

  public getAuthorById(id: number): Observable<any> {
    return this.http.get(this.API_URL + `/authors/${id}`);
  }

}

