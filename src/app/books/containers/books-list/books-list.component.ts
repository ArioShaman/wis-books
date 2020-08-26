import { Component, OnInit, OnDestroy } from '@angular/core';

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
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.sass']
})
export class BooksListComponent implements OnInit, OnDestroy {

  public authors$: Observable<Author[]>;
  public genres$: Observable<Genre[]>;

  public books: Book[] = [];
  public shadowBooks = new Array(6);

  public searchText: string;

  public selectedAuthors: number[];
  public selectedGenres: string[];

  public pageSize = 9;
  public pageIndex = 0;
  public countPages = 1;
  public countRecords = 0;
  public loaded: boolean = false;

  public ranSackParams = new RanSackParams();

  private destroy$ = new Subject<void>();

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService,
    private genresService: GenresService
  ) {}

  public ngOnInit(): void {
    this.getAuthors();
    this.getGenres();
    this.getBooks();
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

  public getBooks(page: number = 1): void {
    this.loaded = false;
    this.booksService.getBooks(page, this.ranSackParams)
      .pipe(
        delay(1000),
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
    this.ranSackParams.clear();
    this.selectedAuthors = undefined;
    this.selectedGenres = undefined;
    this.searchText = undefined;
    this.getBooks();
  }

  public selectAuthor(authorIds: number[]): void {
    this.ranSackParams.authorIds = authorIds;
    this.selectedAuthors = authorIds;
    this.getBooks();
  }

  public selectGenre(genreNames: string[]): void {
    this.ranSackParams.genreNames = genreNames;
    this.selectedGenres = genreNames;
    this.getBooks();
  }

  public search(value: string): void {
    this.ranSackParams.searchText = value;
    this.searchText = value;
    this.getBooks();
  }

  public pageEvent(event: IPageEvent): void {
    this.pageIndex = event.pageIndex;
    this.books = [];
    this.getBooks(this.pageIndex + 1);
  }

}
