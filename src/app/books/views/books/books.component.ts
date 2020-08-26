import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { BookCreateComponent } from '../../containers/book-create/book-create.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    // this.openCreateModal();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openCreateModal(): void {
    const dialogRef = this.dialog.open(BookCreateComponent);

    dialogRef.afterClosed()
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res) => {
          // call reload books
        }
      );
  }

}
