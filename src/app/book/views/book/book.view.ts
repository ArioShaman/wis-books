import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { BooksService } from '../../../books/services/books.service';
import { BookDeleteComponent } from '../../components/book-delete/book-delete.component';
import { Book } from '../../../books/models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.view.html',
  styleUrls: ['./book.view.sass']
})
export class BookView implements OnInit, OnDestroy {

  public book: Book;
  private destroy$ = new Subject<void>();

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  public ngOnInit(): void {
    this.book = this.route.snapshot.data.book;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public delete(): void {
    const dialogRef = this.dialog.open(BookDeleteComponent);

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => res ? this._delete() : null
      );
  }

  private _delete(): void {
    this.bookService
      .deleteBook(this.book.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => this.router.navigate(['/books']));
  }

}
