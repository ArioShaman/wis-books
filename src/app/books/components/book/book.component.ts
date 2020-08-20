import { Component, OnInit, Input } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Book } from '../../models/book.model';
import { AuthorsService } from '../../../core/services/authors.service';


@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.sass'],
})
export class BookComponent implements OnInit {

  @Input('book') public book: Book;

  private destroy$ = new Subject<void>();

  constructor(
  private authorService: AuthorsService,
  ) { }

  public ngOnInit(): void {}

}

