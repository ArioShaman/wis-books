import { Component, OnInit, Input } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormBuilder
} from '@angular/forms';

import { IStep } from '../../../core/models/step.interface';
import {
  StepErrorStateMatcher
} from '../../../core/matchers/step-error-state.matcher';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.container.html',
  styleUrls: ['./../account-info-form/account-info-form.container.sass']
})
export class SecondStepContainer implements OnInit {

  @Input('steps')
  public steps: IStep[];

  public secondMatcher;

  @Input('formGroup')
  public formGroup: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  public ngOnInit(): void {
    this.secondMatcher = new StepErrorStateMatcher(this.steps[1]);
  }

  get questionsArray(): FormArray {
    return this.formGroup.controls.questions as FormArray;
  }

  public deleteQuestion(index: number): void {
    this.questionsArray.removeAt(index);
  }

  public addQuestion(): void {
    this.questionsArray.push(this.createQuestion());
  }

  public createQuestion(): FormGroup {
    return this.fb.group({
      question: '',
      answer: ''
    });
  }

}
