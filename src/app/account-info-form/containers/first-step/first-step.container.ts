import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';

import { IStep } from '../../../core/models/step.interface';
import {
  StepErrorStateMatcher
} from '../../../core/matchers/step-error-state.matcher';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.container.html',
  styleUrls: ['./../account-info-form/account-info-form.container.sass']
})
export class FirstStepContainer implements OnInit {

  @Input('steps')
  public steps: IStep[];

  public firstMatcher;

  @Input('formGroup')
  public formGroup: FormGroup;

  constructor() { }

  public ngOnInit(): void {
    // console.log(this.formGroup);
    this.firstMatcher = new StepErrorStateMatcher(this.steps[0]);
  }

}
