import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, ParamsAsMap, ParamMap } from '@angular/router';

import { Subject, Observable } from 'rxjs';
import { takeUntil, debounceTime, take } from 'rxjs/operators';

import { AuthorsService } from '../../../core/services/authors.service';
import { GenresService } from '../../../core/services/genres.service';
import { ParamsService } from '../../services/params.service';
import { Author } from '../../../authors/models/author.model';
import { Genre } from '../../../genres/models/genre.model';


@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.container.html',
  styleUrls: ['./book-filter.container.sass']
})
export class BookFilterContainer implements OnInit, OnDestroy {

  @Output('setRanSack')

  public disabled = true;

  public filterForm: FormGroup;

  public authors$: Observable<Author[]>;
  public genres$: Observable<Genre[]>;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authorsService: AuthorsService,
    private genresService: GenresService,
    private qParams: ParamsService
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
    this._setTree();
  }


  private _listenQueryParams(): void {
    this.route.queryParamMap
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      ).subscribe(
        (params: ParamMap) => {
          this.qParams.setNewParams(params['params']);
          this.filterForm.patchValue(this.qParams.getParams());
          this._setTree();
        }
      );
  }

  private _setTree(): void {
    console.log(this.qParams.getParams());

    this.router.navigate(
      [], {
        relativeTo: this.route,
        replaceUrl: true,
        queryParams: this.qParams.getParams(),
        // queryParamsHandling: 'merge'
      });
  }

  private _setValueChanges(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(1000),
        takeUntil(this.destroy$)
      ).subscribe((res) => {
        this.disabled = false;
        this.qParams.setNewParams(res);
        this._setTree();
      });
  }

  private _initForm(): void {
    this.filterForm = this.fb.group({
      searchText: null,
      authorIds: null,
      genreNames: null
    });
  }


}
