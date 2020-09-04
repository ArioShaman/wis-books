import { Injectable } from '@angular/core';

import { IFilterParam } from '../models/filter-param.interface';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  private curParams: IFilterParam;

  constructor() {
    this.curParams = {};
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
          if (params['genreNames']) {
            if (
              Array.isArray(params['genreNames']) &&
              params['genreNames'].length > 0
            ) {
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
            if (Array.isArray(params['authorIds'])) {
              this.curParams.authorIds = params['authorIds'];
            } else {
              const authorIds = Array(params['authorIds']);
              this.curParams.authorIds = authorIds
                .map((strId: string) => parseInt(strId, 0));
            }
          } else {
            delete this.curParams.authorIds;
          }
          break;

        case 'page':
          if (params['authorIds'] && params['authorIds'].length > 0) {
            this.curParams.page = params['page'];
          } else {
            delete this.curParams.page;
          }
      }
    });
  }

  public getParams(): IFilterParam {
    return this.curParams;
  }

}
