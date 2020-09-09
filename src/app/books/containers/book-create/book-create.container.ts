import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgxImageCompressService } from 'ngx-image-compress';

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
import { AppValidator } from '../../../core/validators/app.validator';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.container.html',
  styleUrls: ['./book-create.container.sass']
})
export class BookCreateContainer implements OnInit, OnDestroy {

  public bookForm: FormGroup;
  public matcher = new BookErrorStateMatcher();

  public submited = false;
  public created = false;
  public uploadedImage = false;
  public uploadedPreviews = false;
  public compressedFile: string;

  public imageChangedEvent: Event;
  public croppedImage: string;
  public filename: string;

  public authors$: Observable<Author[]>;
  public genres$: Observable<Genre[]>;

  public file: File;
  public previews: FileList;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly snack: MatSnackBar,
    private readonly dialogRef: MatDialogRef<BookCreateContainer>,
    private readonly booksService: BooksService,
    private readonly genresService: GenresService,
    private readonly authorsService: AuthorsService,
    private readonly fb: FormBuilder,
    private readonly dialogService: DialogService,
    private readonly compressService: NgxImageCompressService,
    private readonly validator: AppValidator
  ) { }

  public ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick()
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => this.close());

    this.getAuthors();
    this.getGenres();

    this._initForm();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public close(): void {
    if (!this.created) {
      const data: IDialogBody = {
        message: 'Do you want save your data?',
        type: 'multiple'
      };

      this.dialogService.openDialog(data)
        .pipe(
          map(res => res ? null : this.dialogRef.close()),
          takeUntil(this._destroy$)
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

  public imageCropped(event: ImageCroppedEvent, filename: string): void {
    this.croppedImage = event.base64;
    fetch(this.croppedImage)
      .then(res => res.blob())
      .then((blob) => {
        const file = new File([blob], this.filename, { type: 'image/png' });
        this.compressImage(file);
      });
  }

  public upload(fileList: FileList, event: Event): void {
    this.file = fileList[0];
    this.uploadedImage = true;
    this.filename = this.file.name;

    setTimeout(() => this.imageChangedEvent = event, 401);
  }

  public uploadPreviews(fileList: FileList): void {
    this.previews = fileList;

    this.bookForm.patchValue({
      previews: this.previews
    });

    this.uploadedPreviews = true;
  }

  public compressImage(fie: File): void {
    const reader = new FileReader();

    reader.onload = (event: Event) => {
      const orientation = -1;
      const localUrl = event.target['result'];

      this.compressService
        .compressFile(localUrl, orientation, 50, 50)
        .then(
          (base64) => {
            fetch(base64)
              .then(res => res.blob())
              .then((blob) => {
                const compressedFile = new File(
                  [blob],
                  this.filename,
                  { type: 'image/png' }
                );

                this.bookForm.patchValue({
                  image: compressedFile
                });
              });
          }
        );
    };

    reader.readAsDataURL(this.file);
  }

  public onSubmit(cf: IForm): void {
    this.submited = true;

    if (!this.bookForm.invalid) {
      const bookRequest = BookRequest.new(BookRequest, cf);

      this.booksService.createBook(bookRequest)
        .pipe(takeUntil(this._destroy$))
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

  private _initForm(): void {
    this.bookForm = this.fb.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        author: [null, Validators.required],
        genres: [[]],
        writingDate: [null, Validators.required],
        releaseDate: [null, Validators.required],
        price: ['', Validators.required],
        image: [null, Validators.required],
        previews: [null]
      },
      {
        validators: this.validator.checkDateValidation
      }
    );
  }

}
