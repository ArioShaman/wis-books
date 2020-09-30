import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';

import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { IStep } from '../../../core/models/step.interface';
import {
  StepErrorStateMatcher
} from '../../../core/matchers/step-error-state.matcher';

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
  public testFilteredOptions$: Observable<string[]>;

  @Input('steps')
  public steps: IStep[];

  public firstMatcher;

  @Input('formGroup')
  public formGroup: FormGroup;

  private _destroy$ = new Subject();

  constructor() { }

  public ngOnInit(): void {
    this.firstMatcher = new StepErrorStateMatcher(this.steps[0]);

    this._setListeners();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _setListeners(): void {
    this.testFilteredOptions$ = this.formGroup.controls.firstName.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)),
        takeUntil(this._destroy$)
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.testOptions
      .filter(option => option.toLowerCase().includes(filterValue));
  }

}
