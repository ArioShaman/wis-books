import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Ransack } from '../models/ransack.enum';
import { IRansackParam } from '../models/ransack-param.interface';

@Injectable({
  providedIn: 'root'
})
export class RansackService {


  constructor() { }

  public toRansack(filters: any, options?: any): HttpParams {
    let httpParams = new HttpParams();

    const keys = Object.keys(filters);
    keys.forEach((key) => {
      if (Array.isArray(options[key])) {
        /*
          If Options is Array of options
        */
        options[key].forEach((option) => {
          httpParams = this._setParam(option, filters, key, httpParams);
        });
      } else if (options[key] instanceof Object) {
        /*
          If Options is Option object
        */
        const option = options[key];
        httpParams = this._setParam(option, filters, key, httpParams);
      } else {
        /*
          If Options is Ransack operation
        */
        const option = {
          matcher: options[key]
        };

        httpParams = this._setParam(option, filters, key, httpParams);
      }
    });

    return httpParams;
  }

  private _setParam(
    option: IRansackParam,
    filters: any,
    key: string,
    httpParams: HttpParams
  ): HttpParams {
    let filter = filters[key];

    const matcher = this._kebabStr(Ransack[option.matcher]);

    const name = option.hasOwnProperty('name') ?
      this._kebabStr(option.name) : this._kebabStr(key);

    const postfix = option.hasOwnProperty('postfix') ?
      `_${option.postfix}` : '';

    if (option.hasOwnProperty('from')) {
      filter = filter[option.from];
    }

    let paramName = `q[${name}${postfix}_${matcher}]`;

    if (Array.isArray(filter)) {
      paramName = paramName + '[]';

      filter.forEach((filterEl) => {
        httpParams = httpParams.set(paramName, filterEl);
      });
    } else {
      httpParams = httpParams.set(paramName, filter);
    }

    return httpParams;
  }

  private _kebabStr(str: string): string {
    return str.split(/(?=[A-Z])/)
      .map((el) => el.toLowerCase())
      .join('_');
  }
}
