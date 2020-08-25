import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-confirm',
  templateUrl: './book-confirm.component.html',
  styleUrls: ['./book-confirm.component.sass']
})
export class BookConfirmComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<BookConfirmComponent>,
  ) { }

  public ngOnInit(): void {
  }

}
