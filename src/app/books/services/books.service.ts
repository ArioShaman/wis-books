import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {

  protected API_URL: string = environment.hosts.api_host;

  constructor(
    private http: HttpClient,
  ) { }

  public geBooks(): Observable<any> {
    return this.http.get(this.API_URL + '/books');
  }

}
