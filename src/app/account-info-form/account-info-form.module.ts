import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { NgxMaskModule } from 'ngx-mask';

import { AccountInfoFormRoutingModule } from './account-info-form-routing.module';
import { AccountInfoFormView } from './views/account-info-form/account-info-form.view';
import { AccountInfoFormContainer } from './containers/account-info-form/account-info-form.container';
import { FirstStepContainer } from './containers/first-step/first-step.container';
import { SecondStepContainer } from './containers/second-step/second-step.container';
import { ThirdStepContainer } from './containers/third-step/third-step.container';
import { StepButtonsComponent } from './components/step-buttons/step-buttons.component';


@NgModule({
  declarations: [
    AccountInfoFormView,
    AccountInfoFormContainer,
    FirstStepContainer,
    SecondStepContainer,
    ThirdStepContainer,
    StepButtonsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    AccountInfoFormRoutingModule,
    NgxMaskModule.forRoot()
  ]
})
export class AccountInfoFormModule { }
