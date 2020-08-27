import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, of, timer } from 'rxjs';
import { map, debounce } from 'rxjs/operators';

import { Book } from '../models/book.model';
import { BooksResponse } from '../models/books-response.model';
import { BookRequest } from '../models/book-request.model';
import { RanSackParams } from '../models/ran-sack-params.model';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public createBook(data: BookRequest): Observable<Book> {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('writing_date', String(data.writingDate));
    formData.append('release_date', String(data.releaseDate));
    formData.append('price', String(data.price));
    formData.append('image', data.image);

    const uri = `/authors/${data.author.id}/books`;

    return this.http.post(uri, formData)
      .pipe(
        map((res) => Book.new(Book, res))
      );
  }

  public getBooks(
    page: number,
    ranSackParams: RanSackParams
  ): Observable<BooksResponse> {
    const params = {
      params: this.setParams(page, ranSackParams)
    };

    return this.http.get('/books', params)
      .pipe(
        debounce(() => timer(1000)),
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

  private setParams(page: number, ranSackParams: RanSackParams): HttpParams {
    let httpParams = new HttpParams()
      .set('limit', '9')
      .set('page', String(page));

    Object.keys(ranSackParams).forEach(
      (key) => {
        const param = ranSackParams[key];

        switch (key) {
          case 'authorIds':
            param.map((id) => {
              httpParams = httpParams.append('q[author_id_in][]', id);
            });

            break;
          case 'genreNames':
            param.map((name) => {
              httpParams = httpParams.append('q[genres_name_in][]', name);
            });
            break;
          case 'searchText':
            if (param) {
              httpParams = httpParams.append(
                'q[title_or_description_cont]', param
              );
            }

            break;
        }
      }
    );

    return httpParams;
  }

}
