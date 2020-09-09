import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs';

export interface ICanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<true> | boolean;
}

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ICanComponentDeactivate> {

  public canDeactivate(
    component: ICanComponentDeactivate
  ): Observable<boolean> | boolean | Promise<true> {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
