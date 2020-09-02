import { Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IDialogBody } from '../../models/dialog-body.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {

  public Object = Object;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogBody,
  ) { }

  public ngOnInit(): void {}

}
