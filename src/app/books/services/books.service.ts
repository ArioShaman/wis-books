import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable, timer } from 'rxjs';
import { map, debounce } from 'rxjs/operators';

import { Book } from '../models/book.model';
import { BooksResponse } from '../models/books-response.model';
import { BookRequest } from '../models/book-request.model';
import { IFilterParam } from '../models/filter-param.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public getBooks(
    qParams: IFilterParam
  ): Observable<BooksResponse> {
    const params = {
      params: this._setParams(qParams)
    };

    return this.http.get('/books', params)
      .pipe(
        debounce(() => timer(1500)),
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

  public getAuthorBooks(
    authorId: number,
    page: number = 1
  ): Observable<BooksResponse> {
    const params = {
      params: this._setParams({
        page
      })
    };

    return this.http.get(`/authors/${authorId}/books/`, params)
      .pipe(
        debounce(() => timer(1500)),
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

  public getGenreBooks(
    genre: string,
    page: number = 1
  ): Observable<BooksResponse> {
    const params = {
      params: this._setParams({
        page,
        genreNames: [genre]
      })
    };

    return this.http.get('/books', params)
      .pipe(
        debounce(() => timer(1500)),
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

  public getBook(id: number): Observable<Book> {
    const uri = `/books/${id}`;

    return this.http.get(uri)
      .pipe(map((res: any) => Book.new(Book, res)));
  }

  public createBook(data: BookRequest): Observable<Book> {
    const formData = this._setFormData(data);

    const uri = `/authors/${data.author.id}/books`;

    return this.http.post(uri, formData)
      .pipe(map(res => Book.new(Book, res)));
  }

  public updateBook(data: BookRequest): Observable<Book> {
    const formData = this._setFormData(data);

    const uri = `/books/${data.id}`;

    return this.http.put(uri, formData)
      .pipe(map(res => Book.new(Book, res)));
  }

  public deleteBook(id: number): Observable<Book> {
    const uri = `/books/${id}`;

    return this.http.delete(uri)
      .pipe(map((res: any) => Book.new(Book, res)));
  }

  private _setFormData(data: BookRequest): FormData {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('writing_date', String(data.writingDate));
    formData.append('release_date', String(data.releaseDate));
    formData.append('price', String(data.price));

    if (data.image) {
      formData.append('image', data.image);
    }

    // ### FIX ###
    // Uncomment when backend changes
    // will be loaded to server
    // Array.prototype
    //   .forEach
    //   .call(data.previews, (file) => {
    //     formData.append('previews_attributes[][file]', file);
    //   });

    return formData;
  }

  private _setParams(qParams: IFilterParam): HttpParams {
    let httpParams = new HttpParams()
      .set('limit', '12')
      .set('page', String(qParams.page));

    Object.keys(qParams).forEach(
      (key) => {
        const param = qParams[key];
        if (param) {
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
      }
    );

    return httpParams;
  }

}
