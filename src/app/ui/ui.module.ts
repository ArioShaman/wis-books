import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

import { AuthDirective } from '../auth/directives/auth.directive';
import { AdminShowDirective } from '../auth/directives/admin-show.directive';

import { BookComponent } from './components/book/book.component';
import { NavbarContainer } from './containers/navbar/navbar.container';
import { CartCounterContainer } from './containers/cart-counter/cart-counter.container';

@NgModule({
  declarations: [
    BookComponent,
    AuthDirective,
    AdminShowDirective,
    NavbarContainer,
    CartCounterContainer
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatChipsModule,
    MatCardModule
  ],
  exports: [
    BookComponent,
    NavbarContainer,
    AuthDirective,
    AdminShowDirective
  ]
})
export class UIModule { }
