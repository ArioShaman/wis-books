import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogService } from '../../../core/services/dialog.service';
import { IStep } from '../../../core/models/step.interface';

@Component({
  selector: 'app-account-info-form',
  templateUrl: './account-info-form.container.html',
  styleUrls: ['./account-info-form.container.sass']
})
export class AccountInfoFormContainer implements OnInit, OnDestroy {

  public accountForm: FormGroup;
  public steps: IStep[] = [
    {
      id: 1,
      tag: 'firstStep',
      label: 'Personal Info',
      isValid: false,
      submitted: false
    },
    {
      id: 2,
      tag: 'secondStep',
      label: 'Secret Qestions',
      isValid: false,
      submitted: false
    },
    {
      id: 3,
      tag: 'thirdStep',
      label: 'Enter your credit card data',
      isValid: false,
      submitted: false
    }
  ];

  public activeStep: IStep = this.steps[0];

  private _destroy$ = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: DialogService
  ) { }

  public ngOnInit(): void {
    this._initForm();
  }

  public activateStep(step: IStep): void {
    if (step.id < this.activeStep.id) {
      this.activeStep = step;
    } else {
      this.activeStep.submitted = true;

      if (this.accountForm.get(this.activeStep.tag).valid) {
        this.activeStep = step;
      }
    }
  }

  public onSubmit(cf: any): void {
    this.activeStep.submitted = true;

    console.log(cf);

    if (this.accountForm.valid) {
      const data = {
        message: 'Form is sended',
        type: 'single'
      };

      this.dialog.openDialog(data)
        .pipe(
          takeUntil(this._destroy$)
        )
        .subscribe();
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public checkAction(action): void {
    console.log(action);
    switch (action) {
      case 'next':
        this._nextStep();
        break;

      case 'prev':
        this._prevStep();
        break;
    }
  }

  public createQuestion(): FormGroup {
    return this.fb.group({
      question: '',
      answer: ''
    });
  }

  private _initForm(): void {
    this.accountForm = this.fb.group({
      firstStep: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        country: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
        home: ['', Validators.required]
      }),
      secondStep: this.fb.group({
        questions: this.fb.array([this.createQuestion()])
      }),
      thirdStep: this.fb.group({
        numberCard: ['', Validators.required],
        cardOwner: ['', Validators.required],
        expiredDate: ['', Validators.required],
        cvv: ['', Validators.required]
      })
    });
  }

  private _nextStep(): void {
    this.activeStep.submitted = true;

    if (this.accountForm.get(this.activeStep.tag).valid) {
      const nexInd = this.activeStep.id;
      this.activeStep = this.steps[nexInd];
    }
  }

  private _prevStep(): void {
    const prevInd = this.activeStep.id - 2;
    this.activeStep = this.steps[prevInd];
  }
}
