import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountInfoFormView } from './views/account-info-form/account-info-form.view';

const routes: Routes = [
  {
    path: '',
    component: AccountInfoFormView
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountInfoFormRoutingModule { }
