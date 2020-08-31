import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  public openDialog(data: any): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data
    });
  }

}
