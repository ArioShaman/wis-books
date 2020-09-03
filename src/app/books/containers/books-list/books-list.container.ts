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
  public loaded = false;
  public openedFilters = false;

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
          if (this.pageIndex >= this.countPages) {
            this._navigate(this.countPages);
          }
        },
      );
  }

  public selectGenre(genreNames: string[]): void {
    this.router
      .navigate(['/books'], {
        queryParams: {
          genreNames
        },
        queryParamsHandling: 'merge'
      }
    );
  }
  public pageEvent(event: IPageEvent): void {
    this.pageIndex = event.pageIndex;
    this.books = [];
    this._navigate(this.pageIndex + 1);
  }

  public toggleFilters(): void {
    this.openedFilters = !this.openedFilters;
  }

  public setRanSack(ranSackParams: RanSackParams): void {
    this.curRanSackParams = ranSackParams;
    this.getBooks();
  }

  private _navigate(page: number): void {
    this.router.navigate(
      [], {
        relativeTo: this.route,
        replaceUrl: true,
        queryParams: { page },
        queryParamsHandling: 'merge'
      });
  }

  private _listenQueryPrams(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: ParamsAsMap) => {
        if (res.has('page')) {
          this.pageIndex = res.get('page') - 1;
        }

        if (res.has('searchText') && res.get('searchText')?.length > 0) {
          this.curRanSackParams.searchText = res.get('searchText');
        } else {
          this.curRanSackParams.searchText = null;
        }

        if (res.has('genreNames') && res.getAll('genreNames')?.length > 0) {
          this.curRanSackParams.genreNames = res.getAll('genreNames');
        } else {
          this.curRanSackParams.genreNames = null;
        }

        if (res.has('authorIds') && res.getAll('authorIds')?.length > 0) {
          let authorIds = res.getAll('authorIds');
          authorIds = authorIds.map((strId: string) => parseInt(strId, 2));
          this.curRanSackParams.authorIds = authorIds;
        } else {
          this.curRanSackParams.authorIds = null;
        }

        if (Object.keys(res).length === 0) {
          this.curRanSackParams.clear();
        }
        this.getBooks();
      });
  }


}
