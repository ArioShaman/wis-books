import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import {
  BookCreateComponent
} from '../../containers/book-create/book-create.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit, OnDestroy {


  constructor(
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    // this.openCreateModal();
  }

  public ngOnDestroy(): void { }

  public openCreateModal(): void {
    const dialogRef = this.dialog.open(BookCreateComponent);
  }

}
