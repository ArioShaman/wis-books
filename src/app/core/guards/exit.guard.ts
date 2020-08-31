import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

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
    component: ICanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean | Promise<true> {
    const url: string = state.url;

    return component.canDeactivate ? component.canDeactivate() : true;
  }

}
