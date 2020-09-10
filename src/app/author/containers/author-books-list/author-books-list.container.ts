import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

import { BooksService } from '../../../books/services/books.service';
import { Book } from '../../../books/models/book.model';
import { ParamsService } from '../../../books/services/params.service';
import { IFilterParam } from '../../../books/models/filter-param.interface';

interface IPageEvent {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}

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
  public pageIndex = 0;
  public countPages = 1;
  public countRecords = 0;
  public loaded = false;
  public books: Book[] = [];
  private _destroy$ = new Subject<void>();

  constructor(
    private readonly booksService: BooksService,
    private readonly qParams: ParamsService,
  ) { }

  public ngOnInit(): void {
    // this._getBooks();
    this._listenParams();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public pageEvent(event: IPageEvent): void {
    this.pageIndex = event.pageIndex;
    this.books = [];
    this.loaded = false;

    this.qParams.setNewParams({
      page: this.pageIndex + 1
    });

    const el = document.getElementsByClassName('grid')[0];
    el.scrollIntoView();
  }

  private _listenParams(): void {
    this.qParams.getParams$()
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => this._getBooks(res));
  }

  private _getBooks(
    params: IFilterParam,
  ): void {
    this.booksService.getAuthorBooks(this.authorId, params)
      .pipe(
        delay(700),
        takeUntil(this._destroy$)
      )
      .subscribe((res) => {
        this.loaded = true;
        this.books = res.books;
        this.countRecords = res.meta.records;
        this.countPages = res.meta.pages;
      });
  }

}
