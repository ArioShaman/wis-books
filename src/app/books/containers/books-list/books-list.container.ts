import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { takeUntil, delay, debounceTime } from 'rxjs/operators';

import { BooksService } from '../../services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { Book } from '../../models/book.model';
import { Author } from '../../../authors/models/author.model';
import { Genre } from '../../../genres/models/genre.model';
import { RanSackParams } from '../../models/ran-sack-params.model';

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

  public authors$: Observable<Author[]>;
  public genres$: Observable<Genre[]>;

  public books: Book[] = [];
  public shadowBooks = new Array(6);

  public searchText: string;

  public filterForm: FormGroup = new FormGroup({
    searchControl: new FormControl(),
    authorsControl: new FormControl(),
    genresControl: new FormControl()
  });

  public selectedAuthors: number[];
  public selectedGenres: string[];

  public pageSize = 12;
  public pageIndex = 0;
  public countPages = 1;
  public countRecords = 0;
  public loaded: boolean = false;
  public disabled: boolean = true;
  public openedFilters: boolean = false;

  public ranSackParams = new RanSackParams();

  private destroy$ = new Subject<void>();

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService,
    private genresService: GenresService,
    private route: ActivatedRoute
  ) {
    this._setValueChanges();
  }

  public ngOnInit(): void {
    this.getGenres();
    this.getAuthors();

    this.route.queryParams
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        (param) => {
          const genre = param['genre'];
          if (genre) {
            if (Array.isArray(genre)) {
              this.filterForm.patchValue({
                genresControl: genre
              });
            } else {
              this.filterForm.patchValue({
                genresControl: [genre]
              });
            }
          } else {
            this.getBooks();
          }
        }
        );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getGenres(): void {
    this.genres$ = this.genresService
      .getAllGenres();
  }

  public getAuthors(): void {
    this.authors$ = this.authorsService
      .getAllAuthors();
  }

  public getBooks(page: number = this.pageIndex + 1): void {
    this.loaded = false;
    this.booksService.getBooks(page, this.ranSackParams)
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

  public clearFilter(): void {
    this.disabled = true;

    this.ranSackParams.clear();
    this.disabled = true;
    this.filterForm.reset();
  }

  public selectGenre(genreNames: string[]): void {
    this.filterForm.patchValue({
      genresControl: genreNames
    });
  }

  public pageEvent(event: IPageEvent): void {
    this.pageIndex = event.pageIndex;
    this.books = [];
    this.getBooks(this.pageIndex + 1);
  }

  public toggleFilters(): void {
    this.openedFilters = !this.openedFilters;
  }

  private _setValueChanges(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$)
      ).subscribe((res) => {
        this.disabled = false;
        if (res.searchControl) {
          this.ranSackParams.searchText = res.searchControl;
        }
        if (res.genresControl) {
          this.ranSackParams.genreNames = res.genresControl;
        }

        if (res.authorsControl) {
          this.ranSackParams.authorIds = res.authorsControl;
        }
        this.getBooks();
      });
  }

}
