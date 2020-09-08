import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, delay, debounceTime, skip } from 'rxjs/operators';

import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';
import { ParamsService } from '../../services/params.service';
import { IFilterParam } from '../../models/filter-param.interface';

interface IPageEvent {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.container.html',
  styleUrls: ['./books-list.container.sass']
})
export class BooksListContainer implements OnInit, OnDestroy {

  public books: Book[] = [];
  public shadowBooks = new Array(6);

  public searchText: string;

  public selectedAuthors: number[];
  public selectedGenres: string[];

  public pageSize = 12;
  public pageIndex = 0;
  public countPages = 1;
  public countRecords = 0;
  public loaded = false;


  private destroy$ = new Subject<void>();

  constructor(
    private booksService: BooksService,
    private qParams: ParamsService
  ) {}

  public ngOnInit(): void {
    this._listenParams();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getBooks(
    params: IFilterParam
  ): void {
    this.loaded = false;
    this.booksService.getBooks(params)
      .pipe(
        delay(700),
        takeUntil(this.destroy$)
      ).subscribe(
        (res) => {
          this.loaded = true;
          this.books = res.books;
          this.countRecords = res.meta.records;
          this.countPages = res.meta.pages;
        },
      );
  }

  public selectGenre(genreNames: string[]): void {
    this.qParams.setNewParams({ genreNames });
  }

  public pageEvent(event: IPageEvent): void {
    this.pageIndex = event.pageIndex;
    this.books = [];
    this.qParams.setNewParams({
      page: this.pageIndex + 1
    });
  }


  private _listenParams(): void {
    this.qParams.getParams$()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => this.getBooks(res));
  }

}
