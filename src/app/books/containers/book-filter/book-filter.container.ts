import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Subject, Observable } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, distinct } from 'rxjs/operators';

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

const DEFAULT_MATRIX_OF_CHANGES = [true];

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.container.html',
  styleUrls: ['./book-filter.container.sass']
})
export class BookFilterContainer implements OnInit, OnDestroy {

  public disabled = true;
  public openedFilters = false;

  public prevMatrixChanges = DEFAULT_MATRIX_OF_CHANGES;
  public filterForm: FormGroup;

  public authors$: Observable<Author[]>;
  public genres$: Observable<Genre[]>;

  private _destroy$ = new Subject<void>();
  private _prevParams: IFilterParam;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authorsService: AuthorsService,
    private readonly genresService: GenresService,
    private readonly qParams: ParamsService
  ) {
    this._getParams();
  }

  public ngOnInit(): void {
    this.getGenres();
    this.getAuthors();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
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
        takeUntil(this._destroy$)
      )
      .subscribe((res: IFilterParam) => {
        this.disabled = false;
        if (!this._compareForm(res)) {
          this.qParams.setNewParams(res);
          this.qParams.setNewParams({ page: 1 });
        }
        this._prevParams = res;
      });
  }

  private _compareForm(formData: IFilterParam): boolean {
    let isSameText = false;
    let isSameAuthors = false;
    let isSameGenres = false;

    if (formData.searchText === this._prevParams.searchText) {
      isSameText = true;
    }

    // isSameAuthors = this._compareSelectArray(formData, 'authorIds');
    // isSameGenres = this._compareSelectArray(formData, 'genreNames');
    //fix this part

    const curMatrixChanges = [isSameText];
    // console.log(this.prevMatrixChanges);
    // console.log(curMatrixChanges);

    return this._compareMatrixChanges(curMatrixChanges);
  }

  private _compareSelectArray(cur: IFilterParam, key: string): boolean {
    let isSame = false;
    const prev = this._prevParams;

    if (cur[key] && prev[key]) {
      if (cur[key].length === prev[key].length) {
        cur[key].forEach((el, index) => {
          if (el === prev[key][index]) {
            isSame = true;
          }
        });
      }
    }

    return isSame;
  }

  private _compareMatrixChanges(curMatrix: boolean[]): boolean {
    let isCompare = false;

    curMatrix.forEach((el, index) => {
      if (el && this.prevMatrixChanges[index]) {
        isCompare = true;
      }
    });

    this.prevMatrixChanges = curMatrix;

    return isCompare;
  }

  private _getParams(): void {
    this.qParams.getParams$()
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (res) => {
          this._initForm(res);
          this._prevParams = res;
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
    // this._compareForm(this.filterForm.value);
  }

}
