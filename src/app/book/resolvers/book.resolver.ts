import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { BooksService } from '../../books/services/books.service';
import { Book } from '../../books/models/book.model';

@Injectable()
export class BookResolve implements Resolve<Book> {

  constructor(private readonly booksService: BooksService) {}

  public resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    return this.booksService
      .getBook(route.params.id);
  }

}
