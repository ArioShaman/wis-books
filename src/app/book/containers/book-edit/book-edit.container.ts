import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn
} from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Observable, Subject, of } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

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

  private destroy$ = new Subject<void>();

  constructor(
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private booksService: BooksService,
    private genresService: GenresService,
    private authorsService: AuthorsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogService: DialogService
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
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(cf: IForm): void {
    this.submited = true;
    if (!this.bookForm.invalid) {
      const bookRequest = BookRequest.new(BookRequest, cf);
      this.booksService.updateBook(bookRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => {
            this.snack.open('Book edited', 'Ok', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.router.navigate(['/books']);
          }
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
            takeUntil(this.destroy$)
          ).subscribe(
            (res: boolean) => {
              resolve(res);
            }
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
        validators: [this.checkDateValidation, this.checkImageValidation]
      }
    );
    if (this.book.image) {
      this.bookForm.patchValue({
        uploadedImage: true
      });
    }
    this.bookForm.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(data => this.edited = true);
  }

  public checkDateValidation: ValidatorFn =
  (control: FormGroup): null => {
    const wDate = control.get('writingDate');
    const rDate = control.get('releaseDate');
    if (rDate.value < wDate.value) {
      rDate.setErrors({ invalidDate: true });
    }

    return null;
  }

  public checkImageValidation: ValidatorFn =
  (control: FormGroup): null => {
    const imageState = control.get('uploadedImage');
    if (!imageState.value) {
      imageState.setErrors({ imageError: true });
    }

    return null;
  }

  public upload(fileList: FileList): void {
    const file = fileList[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: Event) => {
      this.fileUrl = `url('${event.target['result']}')`;
    });
    reader.readAsDataURL(file);

    this.bookForm.patchValue({
      image: file,
      uploadedImage: true
    });
  }

  public getGenres(): void {
    this.genres$ = this.genresService
      .getAllGenres();
  }

  public getAuthors(): void {
    this.authors$ = this.authorsService
      .getAllAuthors();
  }

}
