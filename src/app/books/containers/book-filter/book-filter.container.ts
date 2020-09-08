import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Subject, Observable } from 'rxjs';
import { takeUntil, debounceTime, take } from 'rxjs/operators';

import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { ParamsService } from '../../services/params.service';
import { Author } from '../../../authors/models/author.model';
import { Genre } from '../../../genres/models/genre.model';
import { IFilterParam } from '../../models/filter-param.interface';

const DEFAULT: IFilterParam = {
  searchText: null,
  genreNames: null,
  authorIds: null
};

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.container.html',
  styleUrls: ['./book-filter.container.sass']
})
export class BookFilterContainer implements OnInit, OnDestroy {

  public disabled = true;

  public filterForm: FormGroup;
  public openedFilters = false;

  public authors$: Observable<Author[]>;
  public genres$: Observable<Genre[]>;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authorsService: AuthorsService,
    private genresService: GenresService,
    private qParams: ParamsService
  ) {
    this._getParams();
  }

  public ngOnInit(): void {
    this.getGenres();
    this.getAuthors();
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
    this.qParams.setNewParams(DEFAULT);
  }

  public toggleFilters(): void {
    this.openedFilters = !this.openedFilters;
  }

  private _setValueChanges(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$)
      ).subscribe((res) => {
        this.disabled = false;
        this.qParams.setNewParams(res);
      });
  }

  private _getParams(): void {
    this.qParams.getParams$()
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(
        (res) => {
          this._initForm(res);
          this.disabled = false;
        }
      );
  }


  private _initForm(params: IFilterParam): void {
    this.filterForm = this.fb.group({
      searchText: [params.searchText],
      authorIds: [params.authorIds],
      genreNames: [params.genreNames]
    });
    this._setValueChanges();
  }

}
