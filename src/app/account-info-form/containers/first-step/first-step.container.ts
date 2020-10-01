import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil, debounceTime } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { IStep } from '../../../core/models/step.interface';
import {
  StepErrorStateMatcher
} from '../../../core/matchers/step-error-state.matcher';

const COUNTRIES_URL = 'https://restcountries.eu/rest/v2/all';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.container.html',
  styleUrls: ['./../account-info-form/account-info-form.container.sass']
})
export class FirstStepContainer implements OnInit, OnDestroy {

  public testOptions = [
    'aaa',
    'bbb'
  ];
  public filteredCountries$: Observable<string[]>;

  @Input('steps')
  public steps: IStep[];

  public firstMatcher;

  @Input('formGroup')
  public formGroup: FormGroup;
  public countries = [];

  private _destroy$ = new Subject();

  constructor() { }

  public ngOnInit(): void {
    this.firstMatcher = new StepErrorStateMatcher(this.steps[0]);

    this._getCoutries();
    this._setListeners();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getCoutries(): void {
    fetch(COUNTRIES_URL)
      .then((res) => res.json())
      .then((data) => this.countries = data);
  }

  private _setListeners(): void {
    this.filteredCountries$ = this.formGroup.controls.country .valueChanges
      .pipe(
        debounceTime(600),
        startWith(''),
        map(value => this._filter(value)),
        takeUntil(this._destroy$)
      );
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();
    // console.log(this.countries);
    return this.countries
      .filter((country) => country.name.toLowerCase().includes(filterValue));
  }

}
