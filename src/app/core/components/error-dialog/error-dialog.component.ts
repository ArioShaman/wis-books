import { Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  public ngOnInit(): void {

  }


}
