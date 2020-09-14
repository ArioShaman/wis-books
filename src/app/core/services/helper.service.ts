import { Injectable } from '@angular/core';

import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public isEqual(prev: any, cur: any): boolean {
    return _.isEqual(prev, cur);
  }

  public isMatch(prev: any, cur: any): boolean {
    return _.isMatch(prev, cur);
  }

  public isMatchWith(prev: any, cur: any): boolean {
    return _.isMatchWith(cur, prev, this._compareNullAndArray);
  }

  private _compareNullAndArray(oldValue: any, newValue: any): boolean {
    if (oldValue === null && Array.isArray(newValue)) {
      console.log('isArray');
      if (newValue.length === 0) {
        return true;
      }
    }
  }

}
