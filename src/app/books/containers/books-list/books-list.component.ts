import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BooksService } from '../../services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { Book } from '../../models/book.model';
import { Author } from '../../../authors/models/author.model';
import { Genre } from '../../../genres/models/genre.model';

@Component({
  selector: 'books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.sass'],
})
export class BooksListComponent implements OnInit, OnDestroy {

  public authors$: Observable<Author[]>;
  public genres$: Observable<Genre[]>;
  public books: Book[] = [];

  public shadowBooks: Object[] = new Array(6);
  public searchText: string;
  public selectedAuthorId: number;
  public selectedGenreId: number;

  private destroy$ = new Subject<void>();

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService,
    private genresService: GenresService,
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
        takeUntil(this.destroy$),
      )
      .subscribe(
        (res) => {
          this.books = res;
        },
      );
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
    console.log(searchValue);
  }

}
