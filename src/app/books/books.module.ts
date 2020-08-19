import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

import { BooksRoutingModule } from './books-routing.module';
import { BooksService } from './services/books.service';
import { BooksComponent } from './views/books/books.component';
import { BooksListComponent } from './containers/books-list/books-list.component';
import { BookComponent } from './components/book/book.component';

@NgModule({
  declarations: [
    BooksComponent,
    BooksListComponent,
    BookComponent,
  ],
  providers: [
    BooksService,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,

    BooksRoutingModule,
  ],
})
export class BooksModule { }
