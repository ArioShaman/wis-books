import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksService {

  constructor(
    private http: HttpClient,
  ) { }

  public getBooks(): Observable<Book[]> {
    return this.http.get('/books')
      .pipe(
        map((res: any) => {
          return Book.newCollection(Book, res.books);
        }),
      );
  }

}
