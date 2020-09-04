import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ParamsAsMap } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { IFilterParam } from '../models/filter-param.interface';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  private curParams: IFilterParam = {
    page: 1
  };
  private curParams$ = new BehaviorSubject<IFilterParam>(this.curParams);

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this._listenQueryParams();
  }

  public setNewParams(params: Object): void {
    const paramKeys = Object.keys(params);
    paramKeys.forEach((key) => {
      switch (key) {
        case 'searchText':
          if (params['searchText'] && params['searchText'].length > 0) {
            this.curParams.searchText = params['searchText'];
          } else {
            delete this.curParams.searchText;
          }
          break;

        case 'genreNames':
          if (params['genreNames'] && params['genreNames'].length > 0) {
            if (Array.isArray(params['genreNames'])) {
              this.curParams.genreNames = params['genreNames'];
            } else {
              this.curParams.genreNames = Array(params['genreNames']);
            }
          } else {
            delete this.curParams.genreNames;
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
            this.curParams.authorIds = authorIds
              .map((strId: string) => parseInt(strId, 0));
          } else {
            delete this.curParams.authorIds;
          }
          break;

        case 'page':
          this.curParams.page = parseInt(params['page'], 0);
      }
    });
    this.curParams$.next(this.curParams);
    this._setTree();
  }

  public getParams(): IFilterParam {
    return this.curParams;
  }

  public getParams$(): Observable<IFilterParam> {
    return this.curParams$.asObservable();
  }

  private _listenQueryParams(): void {
    this.route.queryParamMap
      .pipe(take(1))
      .subscribe(
        (params: ParamsAsMap) => {
          this.setNewParams(params.params);
        }
      );
  }

  private _setTree(): void {
    this.router.navigate(
      [], {
        relativeTo: this.route,
        replaceUrl: true,
        queryParams: this.getParams(),
      });
  }

}
