import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

import { BooksService } from '../../../books/services/books.service';
import { Book } from '../../../books/models/book.model';

@Component({
  selector: 'app-author-books-list',
  templateUrl: './author-books-list.container.html',
  styleUrls: ['./author-books-list.container.sass']
})
export class AuthorBooksListContainer implements OnInit, OnDestroy {

  @Input('authorId')
  public authorId: number;

  public shadowBooks = new Array(12);
  public pageSize = 12;
  public pageIndex = 1;
  public countPages = 1;
  public countRecords = 0;
  public loaded = false;
  public books: Book[] = [];

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly booksService: BooksService,
  ) { }

  public ngOnInit(): void {
    this._getBooks(this.pageIndex);
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public loadMore(): void {
    this.pageIndex += 1;

    this._getBooks(this.pageIndex);
  }

  private _getBooks(
    page: number
  ): void {
    this.booksService.getAuthorBooks(this.authorId, page)
      .pipe(
        delay(700),
        takeUntil(this._destroy$)
      )
      .subscribe((res) => {
        this.loaded = true;

        this.books = this.books.concat(res.books);
        this.countRecords = res.meta.records;
        this.countPages = res.meta.pages;
      });
  }

}
