import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

import { DialogService } from '../../../core/services/dialog.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { IDialogBody } from '../../../core/models/dialog-body.interface';
import { Author } from '../../../authors/models/author.model';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.container.html',
  styleUrls: ['./author-edit.container.sass']
})
export class AuthorEditContainer implements OnInit, OnDestroy {

  public authorForm: FormGroup;
  public authorFormData = new Author();
  public author: Author;
  public submited = false;
  public edited = false;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly snack: MatSnackBar,
    private readonly route: ActivatedRoute,
    private readonly dialogService: DialogService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly authorsService: AuthorsService
  ) { }

  public ngOnInit(): void {
    this.author = this.route.parent.snapshot.data.author;
    this._initForm();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(cf: Object): void {
    this.submited = true;

    if (!this.authorForm.invalid) {
      Object.assign(this.authorFormData, cf);

      this.authorsService.updateAuthor(this.authorFormData)
        .pipe(takeUntil(this._destroy$))
        .subscribe(
          () => this._snackMessage()
        );
    }
  }

  public canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.edited && !this.submited) {
      const data: IDialogBody = {
        message: 'Are you sure you want to leave form?',
        type: 'multiple'
      };

      return new Promise((resolve) => {
        const close = this.dialogService.openDialog(data)
          .pipe(
            take(1),
            takeUntil(this._destroy$)
          )
          .subscribe(
            res => resolve(res)
          );
      });
    }

    return true;
  }

  private _initForm(): void {
    this.authorForm = this.fb.group(
      {
        id: [ this.author.id, Validators.required ],
        firstName: [ this.author.firstName, Validators.required ],
        lastName: [ this.author.lastName, Validators.required ]
      }
    );

    this.authorForm.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this.edited = true);
  }

  private _snackMessage(): void {
    this.snack.open('Author edited', 'Ok', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });

    this.router.navigate(['/authors']);
  }

}