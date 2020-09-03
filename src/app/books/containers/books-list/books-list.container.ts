import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamsAsMap } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';
import { RanSackParams } from '../../models/ran-sack-params.model';
import { IFilterParam } from '../../models/filter-param.interface';

interface IPageEvent {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}


@Component({
  selector: 'books-list',
  templateUrl: './books-list.container.html',
  styleUrls: ['./books-list.container.sass']
})
export class BooksListContainer implements OnInit, OnDestroy {

  public books: Book[] = [];
  public shadowBooks = new Array(6);

  public searchText: string;
  public curRanSackParams = new RanSackParams();

  public selectedAuthors: number[];
  public selectedGenres: string[];

  public pageSize = 12;
  public pageIndex = 0;
  public countPages = 1;
  public countRecords = 0;
  public loaded: boolean = false;
  public openedFilters: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private booksService: BooksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this._listenQueryPrams();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getBooks(
    page: number = this.pageIndex + 1
  ): void {
    this.loaded = false;
    this.booksService.getBooks(page, this.curRanSackParams)
      .pipe(
        delay(700),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res) => {
          this.loaded = true;
          this.books = res.books;
          this.countRecords = res.meta.records;
          this.countPages = res.meta.pages;
        },
      );
  }

  public selectGenre(genreNames: string[]): void {
    this.router
      .navigate(['/books'], {
        queryParams: {
          genreNames
        }
      }
    );
  }
  public pageEvent(event: IPageEvent): void {
    this.pageIndex = event.pageIndex;
    this.books = [];
    this.getBooks(this.pageIndex + 1);
  }

  public toggleFilters(): void {
    this.openedFilters = !this.openedFilters;
  }

  public setRanSack(ranSackParams: RanSackParams): void {
    this.curRanSackParams = ranSackParams;
    this.getBooks();
  }

  private _listenQueryPrams(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ParamsAsMap) => {
        if (res.has('searchText')) {
          this.curRanSackParams.searchText = res.get('searchText');
        }
        if (res.has('genreNames')) {
          this.curRanSackParams.genreNames = res.getAll('genreNames');
        }
        if (res.has('authorIds')) {
          let authorIds = res.getAll('authorIds');
          authorIds = authorIds.map((strId: string) => parseInt(strId, 2));
          this.curRanSackParams.authorIds = authorIds;
        }

        if (Object.keys(res).length === 0) {
          this.curRanSackParams.clear();
        }
        this.getBooks();
      });
  }


}
