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
import { takeUntil } from 'rxjs/operators';

import {
  BookErrorStateMatcher
} from '../../../core/matchers/error-state.matcher';
import { BooksService } from '../../services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { Author } from '../../../authors/models/author.model';
import { Genre } from '../../../genres/models/genre.model';
import { BookRequest } from '../../models/book-request.model';
import {
  BookConfirmComponent
 } from '../../components/book-confirm/book-confirm.component';

interface IForm {
  title: string;
  description: string;
  author: Author;
  genres: [];
  writingDate: Date;
  releaseDate: Date;
  price: number;
}

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.sass']
})
export class BookCreateComponent implements OnInit, OnDestroy {

  public bookForm: FormGroup;
  public matcher = new BookErrorStateMatcher();

  public submited: boolean = false;
  public created: boolean = false;
  public uploadedImage: boolean = false;
  public uploadedPreviews: boolean = false;

  public authors$: Observable<Author[]>;
  public genres$: Observable<Genre[]>;

  public file: File;
  public previews: FileList;

  private destroy$ = new Subject<void>();


  constructor(
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<BookCreateComponent>,
    private booksService: BooksService,
    private genresService: GenresService,
    private authorsService: AuthorsService,
    private fb: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        res => this.close()
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
      const dialogRef = this.dialog.open(BookConfirmComponent);

      dialogRef.afterClosed()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => res ? this.dialogRef.close() : null
        );
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

  public upload(fileList: FileList): void {
    this.file = fileList[0];
    this.bookForm.patchValue({
      image: this.file
    });
    this.uploadedImage = true;
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
