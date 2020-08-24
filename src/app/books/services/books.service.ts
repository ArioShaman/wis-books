import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from '../models/book.model';
import { Meta } from '../../../lib/models/meta.model';
import { BookResponse } from '../models/book-response.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getBooks(page: number = 1): Observable<BookResponse> {
    const params = {
      params: new HttpParams()
      .set('limit', '9')
      .set('page', String(page))
    };

    return this.http.get('/books', params)
      .pipe(
        map((res: any) => {
          return BookResponse.new(
            BookResponse,
            {
              books: Book.newCollection(Book, res.books),
              meta: res.meta
            }
          );
        }),
      );
  }

}
