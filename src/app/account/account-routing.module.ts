import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountView } from './views/account/account.view';

const routes: Routes = [
  {
    path: '',
    component: AccountView
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
export class AccountRoutingModule { }
