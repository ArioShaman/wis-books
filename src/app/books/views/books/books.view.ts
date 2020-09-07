import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import {
  BookCreateContainer
} from '../../containers/book-create/book-create.container';

@Component({
  selector: 'app-books',
  templateUrl: './books.view.html',
  styleUrls: ['./books.view.sass']
})
export class BooksView implements OnInit, OnDestroy {


  constructor(
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    // this.openCreateModal();
  }

  public ngOnDestroy(): void { }

  public openCreateModal(): void {
    const dialogRef = this.dialog.open(BookCreateContainer);
  }

}
