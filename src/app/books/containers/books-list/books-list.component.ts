import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

import { BooksService } from '../../services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { Book } from '../../models/book.model';
import { Author } from '../../../authors/models/author.model';

@Component({
  selector: 'books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.sass'],
})
export class BooksListComponent implements OnInit, OnDestroy {

  public books: Book[] = [];
  public authors: Author[] = [];


  public shadowBooks: Object[] = new Array(6);
  public searchText: string;
  public selectedAuthorId: Author;

  private destroy$ = new Subject<void>();

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService,
  ) {}

  public ngOnInit(): void {
    this.booksService
      .geBooks()
      .pipe(
        delay(500), // for testing skeleton
        takeUntil(this.destroy$),
      ).subscribe(
        (res) => {
          this.books = Book.newCollection(Book, res['books']);
        },
      );

    this.authorsService
      .getAllAuthors()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(
        (res) => {
          this.authors = Author.newCollection(Author, res['authors']);
        },
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public clearFilter(): void {
    this.selectedAuthorId = undefined;
  }
  // public search(): void {
  //   console.log(this.searchText);
  // }

}
