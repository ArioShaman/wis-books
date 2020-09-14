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

  public isEqualWith(prev: any, cur: any): boolean {
    return _.isEqualWith(prev, cur, this._compareNullAndArray);
  }

  public isMatch(prev: any, cur: any): boolean {
    return _.isMatch(prev, cur);
  }

  public isMatchWith(prev: any, cur: any): boolean {
    return _.isMatchWith(cur, prev, this._compareNullAndArray);
  }

  private _compareNullAndArray(oldValue: any, newValue: any): boolean {
    if (oldValue === null && Array.isArray(newValue)) {
      if (newValue.length === 0) {
        return true;
      }
    } else if (oldValue === newValue) {
      return true;
    } else {
      return false;
    }
  }

}
