import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) { }

  public openDialog(data: any): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '300px',
      data
    });
    dialogRef.afterClosed()
      .subscribe(
        (res) => {
          if (data.status === 404) {
            this.router.navigate(['/books']);
          }
        }
      );
  }

}
