import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

import { BookComponent } from './components/book/book.component';


@NgModule({
  declarations: [
    BookComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

    MatChipsModule,
    MatCardModule
  ],
  exports: [
    BookComponent
  ]
})
export class UIModule { }
