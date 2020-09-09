import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { IDialogBody, ISize } from '../models/dialog-body.interface';
import { DialogComponent } from '../components/dialog/dialog.component';

const DEFAULT_SIZE: ISize = {
  width: '400px',
  height: 'auto'
};

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog
  ) { }

  public openDialog(
    data: IDialogBody,
    size: ISize = DEFAULT_SIZE
  ): Observable<any> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: size.width,
      height: size.height,
      data
    });

    return dialogRef.afterClosed();
  }

}
