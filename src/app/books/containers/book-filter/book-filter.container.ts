import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { RanSackParams } from '../../models/ran-sack-params.model';
import { Author } from '../../../authors/models/author.model';
import { Genre } from '../../../genres/models/genre.model';

@Component({
  selector: 'book-filter',
  templateUrl: './book-filter.container.html',
  styleUrls: ['./book-filter.container.sass']
})
export class BookFilterContainer implements OnInit, OnDestroy {

  @Output('setRanSack')
  public setRanSack = new EventEmitter<RanSackParams>();

  public disabled: boolean = true;

  public filterForm: FormGroup;
  public ranSackParams = new RanSackParams();

  public authors$: Observable<Author[]>;
  public genres$: Observable<Genre[]>;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authorsService: AuthorsService,
    private genresService: GenresService,
  ) {
    this.filterForm = this.fb.group({
      searchControl: null,
      authorsControl: null,
      genresControl: null
    });
  }

  public ngOnInit(): void {
    this.getGenres();
    this.getAuthors();

    this._setValueChanges();

    this.route.queryParams
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        (param) => {
          const genre = param['genre'];
          if (genre) {
            if (Array.isArray(genre)) {
              this.filterForm.patchValue({
                genresControl: genre
              });
            } else {
              this.filterForm.patchValue({
                genresControl: [genre]
              });
            }
          } else {
            this.setRanSack.emit(this.ranSackParams);
          }
        });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getGenres(): void {
    this.genres$ = this.genresService
      .getAllGenres();
  }

  public getAuthors(): void {
    this.authors$ = this.authorsService
      .getAllAuthors();
  }

  public clearFilter(): void {
    this.disabled = true;

    this.ranSackParams.clear();
    this.disabled = true;
    this.filterForm.reset();
  }

  public selectGenre(genreNames: string[]): void {
    this.filterForm.patchValue({
      genresControl: genreNames
    });
  }

  private _setValueChanges(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$)
      ).subscribe((res) => {
        this.disabled = false;
        if (res.searchControl) {
          this.ranSackParams.searchText = res.searchControl;
        }
        if (res.genresControl) {
          this.ranSackParams.genreNames = res.genresControl;
        }

        if (res.authorsControl) {
          this.ranSackParams.authorIds = res.authorsControl;
        }
        this.setRanSack.emit(this.ranSackParams);
      });
  }

}
