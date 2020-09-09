import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { IFilterParam } from '../models/filter-param.interface';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  private _curParams: IFilterParam = {
    page: 1
  };
  private _curParams$ = new BehaviorSubject<IFilterParam>(this._curParams);

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this._listenQueryParams();
  }

  public setNewParams(params: Object): void {
    const paramKeys = Object.keys(params);

    paramKeys.forEach((key) => {
      switch (key) {
        case 'searchText':
          if (params['searchText'] && params['searchText'].length > 0) {
            this._curParams.searchText = params['searchText'];
          } else {
            delete this._curParams.searchText;
          }

          break;

        case 'genreNames':
          if (params['genreNames'] && params['genreNames'].length > 0) {
            if (Array.isArray(params['genreNames'])) {
              this._curParams.genreNames = params['genreNames'];
            } else {
              this._curParams.genreNames = Array(params['genreNames']);
            }
          } else {
            delete this._curParams.genreNames;
          }

          break;

        case 'authorIds':
          if (params['authorIds'] && params['authorIds'].length > 0) {
            let authorIds = [];

            if (Array.isArray(params['authorIds'])) {
              authorIds = params['authorIds'];
            } else {
              authorIds = Array(params['authorIds']);
            }

            this._curParams.authorIds = authorIds
              .map((strId: string) => parseInt(strId, 0));
          } else {
            delete this._curParams.authorIds;
          }

          break;

        case 'page':
          this._curParams.page = parseInt(params['page'], 0);

          break;
      }
    });
    this._curParams$.next(this._curParams);
    this._setTree();
  }

  public getParams(): IFilterParam {
    return this._curParams;
  }

  public getParams$(): Observable<IFilterParam> {
    return this._curParams$.asObservable();
  }

  private _listenQueryParams(): void {
    this.route.queryParamMap
      .pipe(take(1))
      .subscribe(
        params => this.setNewParams(params['params'])
      );
  }

  private _setTree(): void {
    const routeParams = {
      relativeTo: this.route,
      replaceUrl: true,
      queryParams: this.getParams(),
    };

    this.router.navigate([], routeParams);
  }

}
