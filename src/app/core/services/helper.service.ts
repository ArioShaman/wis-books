import { Injectable } from '@angular/core';

import { isMatchWith, isEqual } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public isMatchWith(prev: any, cur: any): boolean {
    return isMatchWith(cur, prev, this._compareNullAndArray);
  }

  private _compareNullAndArray(oldValue: any, newValue: any): boolean {
    if (oldValue === null && Array.isArray(newValue)) {
      if (newValue.length === 0) {
        return true;
      }
    } else if (isEqual(oldValue, newValue) || oldValue === newValue) {
      return true;
    } else if (oldValue === null && newValue.length === 0) {
      return true;
    } else {
      return false;
    }
  }

}
