import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

const appearences = [
  'legacy',
  'standard',
  'fill',
  'outline'
];

@Injectable({
  providedIn: 'root'
})
export class MatAppearenceService {

  private _activeAppearence: string;

  constructor() {
    const localAppearence = localStorage.getItem('activeAppearence');

    if (localAppearence !== null) {
      this._activeAppearence = localAppearence;
    } else {
      localStorage.setItem('activeAppearence', appearences[0]);
      this._activeAppearence = appearences[0];
    }
  }

  public getAppearences(): Observable<string[]> {
    return of(appearences);
  }

  public systemAppearence(): Object {
    return {
      appearance: this._activeAppearence
    };
  }

  public getActiveAppearance(): string {
    return this._activeAppearence;
  }

  public setActiveAppearance(appearence: string): void {
    localStorage.setItem('activeAppearence', appearence);

    this._activeAppearence = appearence;
  }

}
