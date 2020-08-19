import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Author } from '../../../authors/models/author.model';
import { Book } from '../../models/book.model';
import { AuthorsService } from '../../../core/services/authors.service';


@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass'],
})
export class BookComponent implements OnInit, OnDestroy {

  @Input('book') public book: Book;
  public author = new Author();

  private destroy$ = new Subject<void>();

  constructor(
  private authorService: AuthorsService,
  ) { }

  public ngOnInit(): void {
    console.log(this.book);
    this.authorService
      .getAuthorById(this.book.id)
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(
        (res) => {
          this.author._fromJSON(res);
        },
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

