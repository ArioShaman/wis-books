import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BookErrorStateMatcher } from '../../../core/matchers/error-state.matcher';
import { BooksService } from '../../services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { Author } from '../../../authors/models/author.model';
import { Genre } from '../../../genres/models/genre.model';
import { BookRequest } from '../../models/book-request.model';
import { BookConfirmComponent } from '../../components/book-confirm/book-confirm.component';

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

  public authors$: Observable<Author[]>;
  public genres$: Observable<Genre[]>;

  private destroy$ = new Subject<void>();

  constructor(
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
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res) => {
          this.close();
        }
      );

    this.getAuthors();
    this.getGenres();
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      author: [null, Validators.required],
      genres: [[]],
      writingDate: [null, Validators.required],
      releaseDate: [null, Validators.required],
      price: ['', Validators.required]
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public close(): void {
    const dialogRef = this.dialog.open(BookConfirmComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        (res) => {
          if (res) {
            this.dialogRef.close();
          }
        }
      );
  }

  public getGenres(): void {
    this.genres$ = this.genresService
      .getAllGenres();
  }

  public getAuthors(): void {
    this.authors$ = this.authorsService
      .getAllAuthors();
  }

  public onSubmit(cf: IForm): void {
    this.submited = true;

    if (!this.bookForm.invalid) {
      const bookRequest = BookRequest.new(BookRequest, cf);
      this.booksService.createBook(bookRequest)
        .pipe(
          takeUntil(this.destroy$)
        ).subscribe(
          (res) => {
            this.close();
          }
        );
    }
  }

}
