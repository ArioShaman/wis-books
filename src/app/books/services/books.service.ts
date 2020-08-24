import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book } from '../models/book.model';
import { BooksResponse } from '../models/books-response.model';
import { BookRequest } from '../models/book-request.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public createBook(formData: BookRequest): Observable<Book> {

    const body = {
      body: {
        title: formData.title,
        description: formData.description,
        genres: formData.genres,
        writing_date: formData.writingDate,
        release_date: formData.releaseDate,
        price: formData.price
      }
    };
    console.log(body);

    return this.http.post(
      `/authors/${formData.author.id}/books`,
      body
    ).pipe(
      map((res: any) => Book.new(Book, res))
    );
  }

  public getBooks(page: number = 1): Observable<BooksResponse> {
    const params = {
      params: new HttpParams()
      .set('limit', '9')
      .set('page', String(page))
    };

    return this.http.get('/books', params)
      .pipe(
        map((res: any) => {
          return BooksResponse.new(
            BooksResponse,
            {
              books: Book.newCollection(Book, res.books),
              meta: res.meta
            }
          );
        }),
      );
  }

}
