import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { BooksModule } from '../books/books.module';
import { GenresModule } from '../genres/genres.module';
import { AuthorsModule } from '../authors/authors.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule,
    BooksModule,
    GenresModule,
    AuthorsModule,
  ],
  exports: [
    AppRoutingModule,
    BooksModule,
    CommonModule,
  ],
})
export class CoreModule { }
