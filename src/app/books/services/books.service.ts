import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {

  protected API_URL: string = environment.hosts.api_host;

  constructor(
    private http: HttpClient,
  ) { }

  public getBooks(): Observable<Book[]> {
    return this.http.get(this.API_URL + '/books')
      .pipe(
        map((res: any) => {
          return Book.newCollection(Book, res.books);
        }),
      );
  }

}
