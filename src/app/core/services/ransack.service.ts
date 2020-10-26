import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Ransack } from '../models/ransack.enum';
import { IRansackParam } from '../models/ransack-param.interface';

@Injectable({
  providedIn: 'root'
})
export class RansackService {


  constructor() { }

  /**
    * Filter keys must be same with Options keys
    *
    * For example:
    *
    * filters: {
    *   authorId: [1,2,3]
    * }
    *
    * options: {
    *   authorId: {
    *     matcher: Ransack.In
    *   }
    * }
  */

  /**
    * Filter can take 3 types of Input params:
    * Ransack enum operation
    * Object of IRansackParam
    * Array of objects IRansackParam
    *
    * For example
    *
    * {
    *   authorId: {
    *     matcher: Ransack.In,
    *   },
    *   price: [
    *     {
    *       matcher: Ransack.Gt,
    *       from: 'min'
    *    },
    *    {
    *       matcher: Ransack.Lt,
    *       from: 'max'
    *    }
    *  ],
    *  title: Ransack.NotEq,
    *}
  */

  /**
    * Options params:
    *
    ****
    * matcher - choose ransack operation;

    ****
    * postfix - add postfix name to param, for example:
    *
    * option = {
    *   author: {
    *     postfix: 'id'
    *   }
    * }
    *
    * return: q[author_id_{matcher}]
    *
    ****
    * name - change naming ransack params from object key to custom name, 
    * for example:
    *
    * options = {
    *   authorId: {
    *     name: 'authorIds'
    *   }
    * };
    *
    * return: q[author_ids_{matcher}]
    *
    ****
    * from - choose value of param from input Object by key, for example:
    *
    * filters = {
    *   price: {
    *     min: 1,
    *     max: 10
    *   }
    * };
    *
    * options = {
    *   price: {
    *     mathcer: Ransack.Gt,
    *     from: 'min'
    *   }
    * }
    *
    * return: 'q[price_gt] = 1'
  */

  public toRansack(filters: any, options?: any): HttpParams {
    let httpParams = new HttpParams();

    const keys = Object.keys(filters);
    keys.forEach((key) => {
      if (Array.isArray(options[key])) {
        /** If Options is Array of options */

        options[key].forEach((option) => {
          httpParams = this._setParam(option, filters, key, httpParams);
        });
      } else if (options[key] instanceof Object) {
        /** If Options is Option object */

        const option = options[key];
        httpParams = this._setParam(option, filters, key, httpParams);
      } else {
        /** If Options is Ransack operation */

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
