import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn
} from '@angular/forms';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { ImageCroppedEvent } from 'ngx-image-cropper';

import {
  BookErrorStateMatcher
} from '../../../core/matchers/error-state.matcher';
import { BooksService } from '../../services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { DialogService } from '../../../core/services/dialog.service';
import { IDialogBody } from '../../../core/models/dialog-body.interface';
import { Author } from '../../../authors/models/author.model';
import { Genre } from '../../../genres/models/genre.model';
import { BookRequest } from '../../models/book-request.model';
import { IForm } from '../../../../lib/models/form.interface';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.container.html',
  styleUrls: ['./book-create.container.sass']
})
export class BookCreateContainer implements OnInit, OnDestroy {

  public bookForm: FormGroup;
  public matcher = new BookErrorStateMatcher();

  public submited: boolean = false;
  public created: boolean = false;
  public uploadedImage: boolean = false;
  public uploadedPreviews: boolean = false;

  public imageChangedEvent: Event;
  public croppedImage: any;

  public authors$: Observable<Author[]>;
  public genres$: Observable<Genre[]>;

  public file: File;
  public previews: FileList;

  private destroy$ = new Subject<void>();


  constructor(
    private snack: MatSnackBar,
    private dialogRef: MatDialogRef<BookCreateContainer>,
    private booksService: BooksService,
    private genresService: GenresService,
    private authorsService: AuthorsService,
    private fb: FormBuilder,
    private dialogService: DialogService
  ) { }

  public ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => this.close()
      );

    this.getAuthors();
    this.getGenres();
    this.bookForm = this.fb.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        author: [null, Validators.required],
        genres: [[]],
        writingDate: [null, Validators.required],
        releaseDate: [ null, Validators.required],
        price: ['', Validators.required],
        image: [null, Validators.required],
        previews: [null]
      },
      {
        validators: this.checkDatevalidation
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  public checkDatevalidation: ValidatorFn =
  (control: FormGroup): null => {
    const wDate = control.get('writingDate');
    const rDate = control.get('releaseDate');
    if (rDate.value < wDate.value) {
      rDate.setErrors({ invalidDate: true });
    }

    return null;
  }

  public close(): void {
    if (!this.created) {
      const data: IDialogBody = {
        message: 'Are you sure you want to leave form?',
        type: 'multiple'
      };

      this.dialogService.openDialog(data)
        .pipe(
          map((res) => res ? this.dialogRef.close() : null),
          takeUntil(this.destroy$)
        )
        .subscribe();
    } else {
      this.dialogRef.close();
    }
  }

  public getGenres(): void {
    this.genres$ = this.genresService
      .getAllGenres();
  }

  public getAuthors(): void {
    this.authors$ = this.authorsService
      .getAllAuthors();
  }

  public imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
    fetch(this.croppedImage)
      .then((res) => res.blob())
      .then((blob) => {
        const filename = Math.random().toString(36).substring(7);
        const file = new File([blob], filename, { type: 'image/png' });
        this.bookForm.patchValue({
          image: file
        });
      });
  }

  public upload(fileList: FileList, event: Event): void {
    this.file = fileList[0];
    this.uploadedImage = true;
    setTimeout(() => this.imageChangedEvent = event, 401);
  }

  public uploadPreviews(fileList: FileList): void {
    this.previews = fileList;
    this.bookForm.patchValue({
      previews: this.previews
    });
    this.uploadedPreviews = true;
  }

  public onSubmit(cf: IForm): void {
    this.submited = true;
    if (!this.bookForm.invalid) {
      const bookRequest = BookRequest.new(BookRequest, cf);
      this.booksService.createBook(bookRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => {
            this.created = true;
            this.snack.open('Book created', 'Ok', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.close();
          }
        );
    }
  }

}
