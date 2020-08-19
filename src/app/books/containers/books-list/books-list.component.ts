import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.sass'],
})
export class BooksListComponent implements OnInit, OnDestroy {

  public books: Book[] = [];
  public shadowBooks: Object[] = new Array(6);

  private destroy$ = new Subject<void>();

  constructor(
    private booksService: BooksService,
  ) {}

  public ngOnInit(): void {
    this.booksService
      .geBooks()
      .pipe(
        delay(1000), // for testing skeleton
        takeUntil(this.destroy$),
      ).subscribe(
        (res) => {
          this.books = res['books'];
        },
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
