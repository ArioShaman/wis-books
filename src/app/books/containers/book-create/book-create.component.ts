import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.sass']
})
export class BookCreateComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<BookCreateComponent>
  ) { }

  public ngOnInit(): void {
  }

  public close(): void {
    this.dialogRef.close();
  }

}
