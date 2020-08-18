import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { BooksModule } from '../books/books.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    BooksModule,
  ],
  exports: [
    AppRoutingModule,
    BooksModule,
    CommonModule,
  ],
})
export class CoreModule { }
