import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

import { AuthDirective } from '../auth/directives/auth.directive';

import { BookComponent } from './components/book/book.component';

@NgModule({
  declarations: [
    BookComponent,
    AuthDirective
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatChipsModule,
    MatCardModule
  ],
  exports: [
    BookComponent,
    AuthDirective
  ]
})
export class UIModule { }
