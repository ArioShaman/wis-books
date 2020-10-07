import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';

import { AccountInfoFormView } from './views/account-info-form/account-info-form.view';

const routes: Routes = [
  {
    path: '',
    component: AccountInfoFormView,
    canActivate: [AuthGuard]
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
