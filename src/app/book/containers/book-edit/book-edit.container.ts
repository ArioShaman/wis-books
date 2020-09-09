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

import { NgxImageCompressService } from 'ngx-image-compress';

import { BooksService } from '../../../books/services/books.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { DialogService } from '../../../core/services/dialog.service';
import { IDialogBody } from '../../../core/models/dialog-body.interface';
import { Author } from '../../../authors/models/author.model';
import { Genre } from '../../../genres/models/genre.model';
import { BookRequest } from '../../../books/models/book-request.model';
import {
  BookErrorStateMatcher
} from '../../../core/matchers/error-state.matcher';
import { Book } from '../../../books/models/book.model';
import { IForm } from '../../../../lib/models/form.interface';
import { environment } from '../../../../environments/environment';
import { AppValidator } from '../../../core/validators/app.validator';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.container.html',
  styleUrls: ['./book-edit.container.sass']
})
export class BookEditContainer implements OnInit, OnDestroy {

  public bookForm: FormGroup;
  public book: Book;
  public matcher = new BookErrorStateMatcher();

  public imageSrc: string;
  public submited = false;
  public edited = false;
  public fileUrl: string | ArrayBuffer;

  public authors$: Observable<Author[]>;
  public genres$: Observable<Genre[]>;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly snack: MatSnackBar,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly booksService: BooksService,
    private readonly genresService: GenresService,
    private readonly authorsService: AuthorsService,
    private readonly fb: FormBuilder,
    private readonly dialogService: DialogService,
    private readonly compressService: NgxImageCompressService,
    private readonly validator: AppValidator
  ) { }

  public ngOnInit(): void {
    this.book = this.route.snapshot.parent.data.book;

    if (this.book.image) {
      this.imageSrc = environment.hosts.imgHost + this.book.image;
    }

    this.getAuthors();
    this.getGenres();
    this.loadForm();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(cf: IForm): void {
    this.submited = true;

    if (!this.bookForm.invalid) {
      const bookRequest = BookRequest.new(BookRequest, cf);

      this.booksService.updateBook(bookRequest)
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
          .subscribe(
            res => resolve(res)
          );
      });
    }

    return true;
  }

  public loadForm(): void {
    this.bookForm = this.fb.group(
      {
        id: [ this.book.id, Validators.required],
        title: [ this.book.title, Validators.required],
        description: [this.book.description, Validators.required],
        author: [this.book.authorId, Validators.required],
        genres: [this.book.genres],
        writingDate: [this.book.writingDate, Validators.required],
        releaseDate: [this.book.releaseDate, Validators.required],
        price: [this.book.price, Validators.required],
        image: [null],
        previews: [null],
        uploadedImage: false,
      },
      {
        validators: [
          this.validator.checkDateValidation,
          this.validator.checkImageValidation]
      }
    );
    if (this.book.image) {
      this.bookForm.patchValue({
        uploadedImage: true
      });
    }
    this.bookForm.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this.edited = true);
  }

  public upload(fileList: FileList): void {
    const file = fileList[0];
    const reader = new FileReader();
    const filename = file.name;
    const orientation = -1;

    reader.addEventListener('load', (event: Event) => {
      const localUrl = event.target['result'];
      this.fileUrl = `url('${localUrl}')`;

      this.compressService
        .compressFile(localUrl, orientation, 50, 50)
        .then(
          (base64) => {
            fetch(base64)
              .then(res => res.blob())
              .then((blob) => {
                const compressedFile = new File(
                  [blob],
                  filename,
                  { type: 'image/png' }
                );

                this.bookForm.patchValue({
                  image: compressedFile,
                  uploadedImage: true
                });
              });
          }
        );
    });
    reader.readAsDataURL(file);
  }

  public getGenres(): void {
    this.genres$ = this.genresService
      .getAllGenres();
  }

  public getAuthors(): void {
    this.authors$ = this.authorsService
      .getAllAuthors();
  }

  private _snackMessage(): void {
    this.snack.open('Book edited', 'Ok', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });

    this.router.navigate(['/books']);
  }

}
