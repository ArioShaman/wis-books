import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

import { BooksService } from '../../services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { Book } from '../../models/book.model';
import { Author } from '../../../authors/models/author.model';
import { Genre } from '../../../genres/models/genre.model';

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

  public selectedAuthorId: number;
  public selectedGenreId: number;
  public pageSize = 9;
  public pageIndex = 0;
  public countPages = 1;
  public loadedPages = 0;
  public countRecords = 0;
  public isLoaded = false;

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

  public getBooks(): void {
    this.booksService.getBooks()
      .pipe(
        delay(1000),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res) => {
          this. books = res.books;
          this.countRecords = res.meta.records;
          this.countPages = res.meta.pages;
          this.loadedPages = 1;

          this.backgroundLoadData();
        },
      );
  }

  public backgroundLoadData(): void {
    if (this.loadedPages < this.countPages) {
      this.loadedPages += 1;
      this.booksService
        .getBooks(this.loadedPages)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(
          (res) => {
            this.books = this.books.concat(res.books);
            this.backgroundLoadData();
          }
        );
    } else {
      this.isLoaded = true;
    }
  }

  public clearFilter(): void {
    this.selectedAuthorId = undefined;
    this.selectedGenreId = undefined;
  }

  public selectAuthor(authorId: number): void {
    this.selectedAuthorId = authorId;
  }

  public selectGenre(genreId: number): void {
    this.selectedGenreId = genreId;
  }

  public search(searchValue: string): void {
  }

  public pageEvent(event: IPageEvent): void {
    this.pageIndex = event.pageIndex;
  }

}
