import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

import { BooksService } from '../../../books/services/books.service';
import { Book } from '../../../books/models/book.model';

@Component({
  selector: 'app-account-books-list',
  templateUrl: './account-books-list.container.html',
  styleUrls: ['./account-books-list.container.sass']
})
export class AccountBooksListContainer implements OnInit, OnDestroy {

  public books: Book[] = [];
  public shadowBooks = new Array(12);
  public loaded = false;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly booksService: BooksService
  ) { }

  public ngOnInit(): void {
    this.getBooks();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getBooks(): void {
    this.loaded = false;
    this.booksService.getBooks({})
      .pipe(
        delay(700),
        takeUntil(this._destroy$)
      )
      .subscribe(
        (res) => {
          this.loaded = true;
          this.books = res.books;
        }
      );
  }

}
