import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  public searchControl = new FormControl();
  public authorsControl = new FormControl();
  public genresControl = new FormControl();


  public selectedAuthors: number[];
  public selectedGenres: string[];

  public pageSize = 9;
  public pageIndex = 0;
  public countPages = 1;
  public countRecords = 0;
  public loaded: boolean = false;
  public disabled: boolean = true;

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
              this.genresControl.patchValue(genre);
            } else {
              this.genresControl.patchValue([genre]);
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

    this.authorsControl.patchValue([]);
    this.genresControl.patchValue([]);
    this.searchControl.patchValue('');
    this.getBooks();
  }

  public selectGenre(genreNames: string[]): void {
    this.genresControl.patchValue(genreNames);
  }
  public pageEvent(event: IPageEvent): void {
    this.pageIndex = event.pageIndex;
    this.books = [];
    this.getBooks(this.pageIndex + 1);
  }
  private _setValueChanges(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$)
      ).subscribe(
        (value: string) => {
          this.disabled = false;
          if (value.length === 0) {
            this.disabled = true;
          }

          this.ranSackParams.searchText = value;
          this.getBooks();
        }
      );

    this.authorsControl.valueChanges
      .pipe(
        debounceTime(600),
        takeUntil(this.destroy$)
      ).subscribe(
        (authorIds: number[]) => {
          this.disabled = false;
          if (authorIds.length === 0) {
            this.disabled = true;
          }

          this.ranSackParams.authorIds = authorIds;
          this.getBooks();
        }
      );
    this.genresControl.valueChanges
      .pipe(
        debounceTime(600),
        takeUntil(this.destroy$)
      ).subscribe(
        (genreNames: string[]) => {
          this.disabled = false;
          if (genreNames.length === 0) {
            this.disabled = true;
          }

          this.ranSackParams.genreNames = genreNames;
          this.getBooks();
        }
      );
  }

}
