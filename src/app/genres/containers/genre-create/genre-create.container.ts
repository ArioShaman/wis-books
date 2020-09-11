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
import { GenresService } from '../../../core/services/genres.service';
import { IDialogBody } from '../../../core/models/dialog-body.interface';
import { Genre } from '../../../genres/models/genre.model';

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.container.html',
  styleUrls: ['./genre-create.container.sass']
})
export class GenreCreateContainer implements OnInit, OnDestroy {

  public genreForm: FormGroup;
  public genreFormData = new Genre();
  public submited = false;
  public edited = false;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly snack: MatSnackBar,
    private readonly route: ActivatedRoute,
    private readonly dialogService: DialogService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly genresService: GenresService
  ) { }

  public ngOnInit(): void {
    this._initForm();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(cf: Object): void {
    this.submited = true;

    if (!this.genreForm.invalid) {
      Object.assign(this.genreFormData, cf);

      this.genresService.updateGenre(this.genreFormData)
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => this._snackMessage());
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
          .subscribe(res => resolve(res));
      });
    }

    return true;
  }

  private _initForm(): void {
    this.genreForm = this.fb.group(
      {
        name: [ '', Validators.required ],
      }
    );

    this.genreForm.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this.edited = true);
  }

  private _snackMessage(): void {
    this.snack.open('Genre edited', 'Ok', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });

    this.router.navigate(['/genres']);
  }

}
