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

  private activeAppearence: string;

  constructor() {
    const localAppearence = localStorage.getItem('activeAppearence');
    if (localAppearence !== null) {
      this.activeAppearence = localAppearence;
    } else {
      localStorage.setItem('activeAppearence', appearences[0]);
      this.activeAppearence = appearences[0];
    }
  }

  public getAppearences(): Observable<string[]> {
    return of(appearences);
  }

  public systemAppearence(): Object {
    return {
      appearance: this.activeAppearence
    };
  }

  public getActiveAppearance(): string {
    return this.activeAppearence;
  }

  public setActiveAppearance(appearence: string): void {
    localStorage.setItem('activeAppearence', appearence);
    this.activeAppearence = appearence;
  }

}
