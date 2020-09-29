import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { NgxMaskModule } from 'ngx-mask';


import { AccountInfoFormRoutingModule } from './account-info-form-routing.module';
import { AccountInfoFormView } from './views/account-info-form/account-info-form.view';
import { AccountInfoFormContainer } from './conatainers/account-info-form/account-info-form.container';

@NgModule({
  declarations: [
    AccountInfoFormView,
    AccountInfoFormContainer
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    AccountInfoFormRoutingModule,
    NgxMaskModule.forRoot()
  ]
})
export class AccountInfoFormModule { }
