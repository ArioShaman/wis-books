import { FormGroupDirective, FormControl, NgForm } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';

import { IStep } from '../models/step.interface';

export class StepErrorStateMatcher implements ErrorStateMatcher {

  private _step: IStep;

  constructor(step: IStep) {
    this._step = step;
  }

  public isErrorState(control: FormControl | null,
                      form: FormGroupDirective | NgForm | null,
                     ): boolean {
    const isSubmitted = this._step && this._step.submitted;

    return !!(control && control.invalid && (isSubmitted));
  }

}
