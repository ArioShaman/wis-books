import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IStep } from '../../../core/models/step.interface';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.container.html',
  styleUrls: [
    './../account-info-form/account-info-form.container.sass',
    './third-step.container.sass'
  ]
})
export class ThirdStepContainer implements OnInit, OnDestroy {

  @Input('steps')
  public steps: IStep[];

  @Input('formGroup')
  public formGroup: FormGroup;

  public brandLogoSrc: string;
  public bankLogoSrc: string;

  private _destroy$ = new Subject();

  constructor() { }

  public ngOnInit(): void {
    this._getBankData();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _getBankData(): void {
    this.formGroup.get('numberCard').valueChanges
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
