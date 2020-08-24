import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';

import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { Author } from '../../../authors/models/author.model';
import { Genre } from '../../../genres/models/genre.model';


@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.sass']
})
export class BookCreateComponent implements OnInit {

  public authors$: Observable<Author[]>;
  public genres$: Observable<Genre[]>;

  constructor(
    private dialogRef: MatDialogRef<BookCreateComponent>,
    private genresService: GenresService,
    private authorsService: AuthorsService
  ) { }

  public ngOnInit(): void {
    this.getAuthors();
    this.getGenres();
  }

  public close(): void {
    this.dialogRef.close();
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
