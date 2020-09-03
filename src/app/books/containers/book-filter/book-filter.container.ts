import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, ParamsAsMap } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { takeUntil, debounceTime, take } from 'rxjs/operators';

import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { RanSackParams } from '../../models/ran-sack-params.model';
import { Author } from '../../../authors/models/author.model';
import { Genre } from '../../../genres/models/genre.model';
import { IFilterParam } from '../../models/filter-param.interface';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.container.html',
  styleUrls: ['./book-filter.container.sass']
})
export class BookFilterContainer implements OnInit, OnDestroy {

  @Output('setRanSack')
  public setRanSack = new EventEmitter<RanSackParams>();

  public disabled = true;

  public filterForm: FormGroup;
  public ranSackParams = new RanSackParams();

  public authors$: Observable<Author[]>;
  public genres$: Observable<Genre[]>;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authorsService: AuthorsService,
    private genresService: GenresService,
  ) {
    this._initForm();
    this._setValueChanges();
  }

  public ngOnInit(): void {
    this.getGenres();
    this.getAuthors();

    this._listenQueryParams();
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
    this.filterForm.reset();
    this._setTree({});
  }


  private _listenQueryParams(): void {
    this.route.queryParamMap
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      ).subscribe(
        (params) => {
          this._setParams(params);
        }
      );
  }

  private _setTree(queryParams: ParamsAsMap): void {
    if (queryParams['searchText']?.length === 0) {
      delete queryParams.searchText;
    }
    if (queryParams['genreNames']?.length === 0) {
      delete queryParams.genreNames;
    }
    if (queryParams['authorIds']?.length === 0) {
      delete queryParams.authorIds;
    }
    this.router.navigate(
      [], {
        relativeTo: this.route,
        replaceUrl: true,
        queryParams,
        queryParamsHandling: 'merge'
      });
  }

  private _setValueChanges(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$)
      ).subscribe((res) => {
        this.disabled = false;
        this._setTree(res);
      });
  }

  private _initForm(): void {
    this.filterForm = this.fb.group({
      searchText: null,
      authorIds: null,
      genreNames: null
    });
  }

  private _setParams(params: ParamsAsMap): void {
    const queryParams: IFilterParam = {};

    if (params.has('searchText')) {
      queryParams['searchText'] = params.get('searchText');
    }

    if (params.has('genreNames')) {
      queryParams['genreNames'] = params.getAll('genreNames');
    }

    if (params.has('authorIds')) {
      let authorIds = params.getAll('authorIds');
      authorIds = authorIds.map((strId: string) => parseInt(strId, 2));
      queryParams['authorIds'] = authorIds;
    }

    this.filterForm.patchValue(queryParams);
    this._setTree(queryParams);
  }

}
