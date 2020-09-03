import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, ParamsAsMap } from '@angular/router';
import { Location } from '@angular/common';

import { Subject, Observable } from 'rxjs';
import { takeUntil, debounceTime, take } from 'rxjs/operators';

import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { RanSackParams } from '../../models/ran-sack-params.model';
import { Author } from '../../../authors/models/author.model';
import { Genre } from '../../../genres/models/genre.model';

interface IFilterParam {
  searchText?: string;
  genreNames?: string[];
  authorIds?: number[];

}

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
    private location: Location
  ) {
    this._initForm();
  }

  public ngOnInit(): void {
    this.getGenres();
    this.getAuthors();

    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (params) => {
          this._setParams(params, 'paramMap');
        }
      );
    this._setValueChanges();
    this._patchForm();
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
    this.ranSackParams.clear();
    this.disabled = true;
    this.filterForm.reset();
  }


  private _setTree(queryParams: Object): void {
    this.router.navigate(
      [], {
        relativeTo: this.route,
        replaceUrl: true,
        queryParams,
      });
  }

  private _setValueChanges(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$)
      ).subscribe((res) => {
        this.disabled = false;
        this._setParams(res, 'ransack');
      });
  }

  private _initForm(): void {
    this.filterForm = this.fb.group({
      searchText: null,
      authorIds: null,
      genreNames: null
    });
  }

  private _setParams(params: ParamsAsMap | IFilterParam, action: string = 'default'): void {
    const queryParams: Object = {};

    switch (action) {
      case 'paramMap':
        if (params.has('searchText')) {
          const paramSearchText = params.get('searchText');
          this._setParam('searchText', paramSearchText, queryParams);
        }

        if (params.has('genreNames')) {
          const paramGenreNames = params.getAll('genreNames');
          this._setParam('genreNames', paramGenreNames, queryParams);
        }

        if (params.has('authorIds')) {
          let paramAuthorIds = params.getAll('authorIds');
          paramAuthorIds = paramAuthorIds.map(
            (strId: string) => parseInt(strId)
          );
          this._setParam('authorIds', paramAuthorIds, queryParams);
        }

        if (params && params.keys.length > 0) {
          this.disabled = false;
        }
        break;

      case 'ransack':
        const paramSearchText = params.searchText;
        this._setParam('searchText', paramSearchText, queryParams);

        if (params.genreNames) {
          const paramGenreNames = params.genreNames;
          this._setParam('genreNames', paramGenreNames, queryParams);
        }

        if (params.authorIds) {
          const paramAuthorIds = params.authorIds;
          this._setParam('authorIds', paramAuthorIds, queryParams);
        }
        break;
    }

    this._setTree(queryParams);
    this.setRanSack.emit(this.ranSackParams);
  }

  private _setParam(
    key: string,
    value: string | string[] | number[],
    queryParams: IFilterParam
  ): void {
    this.ranSackParams[key] = value;
    queryParams[key] = value;
  }

  private _patchForm(): void {
    this.filterForm.patchValue({
      searchText: this.ranSackParams.searchText,
      genreNames: this.ranSackParams.genreNames,
      authorIds: this.ranSackParams.authorIds
    });
  }

}
