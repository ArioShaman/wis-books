import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators
} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogService } from '../../../core/services/dialog.service';
import {
  StepErrorStateMatcher
} from '../../../core/matchers/step-error-state.matcher';
import { IStep } from '../../../core/models/step.interface';
import { environment } from '../../../../environments/environment';

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

  public firstMatcher = new StepErrorStateMatcher(this.steps[0]);
  public secondMatcher = new StepErrorStateMatcher(this.steps[1]);
  public thirdMatcher = new StepErrorStateMatcher(this.steps[2]);


  public activeStep: IStep = this.steps[2];
  public brandLogoSrc: string;
  public bankLogoSrc: string;


  private _destroy$ = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: DialogService
  ) { }

  get questionsArray(): FormArray {
    const secondStepGroup = this.accountForm.get('secondStep') as FormGroup;

    return secondStepGroup.controls.questions as FormArray;
  }

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

  public deleteQuestion(index: number): void {
    this.questionsArray.removeAt(index);
  }

  public createQuestion(): FormGroup {
    return this.fb.group({
      question: '',
      answer: ''
    });
  }

  public addQuestion(): void {
    this.questionsArray.push(this.createQuestion());
  }

  public onSubmit(cf: any): void {
    this.activeStep.submitted = true;

    if (this.accountForm.valid) {
      const data = {
        message: 'Form is sended',
        type: 'single'
      };

      this.dialog.openDialog(data)
        .pipe(
          takeUntil(this._destroy$)
        )
        .subscribe((res) => console.log(res));
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public nextStep(): void {
    this.activeStep.submitted = true;

    if (this.accountForm.get(this.activeStep.tag).valid) {
      const nexInd = this.activeStep.id;
      this.activeStep = this.steps[nexInd];
    }
  }

  public prevStep(): void {
    const prevInd = this.activeStep.id - 2;
    this.activeStep = this.steps[prevInd];
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

    this._getBankData();
  }

  private _getBankData(): void {
    this.accountForm.get('thirdStep.numberCard').valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((res) => {
        this._apiBankCall(res);
      });
  }

  private _apiBankCall(value: string): void {
    const brandLogo = 'brandLogoLightSvg';
    const bankLogo = 'bankLogoSmallLightSvg';

    const url = `https://api.cardinfo.online/?input=${value}&apiKey=${environment.API_KEY}&fields=${brandLogo},${bankLogo}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data[brandLogo]) {
          this.brandLogoSrc = data[brandLogo];
        }
        if (data[bankLogo]) {
          this.bankLogoSrc = data[bankLogo];
        }
      });
  }

}
