import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UIModule } from '../ui/ui.module';

import { AccountRoutingModule } from './account-routing.module';
import { AccountView } from './views/account/account.view';
import { AccountShowContainer } from './containers/account-show/account-show.container';
import { AccountBooksListContainer } from './containers/account-books-list/account-books-list.container';


@NgModule({
  declarations: [
    AccountView,
    AccountShowContainer,
    AccountBooksListContainer
  ],
  imports: [
    CommonModule,
    UIModule,
    MatButtonModule,
    MatIconModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
