import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

import { BooksRoutingModule } from './books-routing.module';
import { BooksService } from './services/books.service';
import { BooksComponent } from './views/books/books.component';
import { BooksListComponent } from './containers/books-list/books-list.component';
import { BookComponent } from './components/book/book.component';
import { FilterByAuthorPipe } from './pipes/filter-by-author.pipe';
import { FilterByGenrePipe } from './pipes/filter-by-genre.pipe';
import { BookCreateComponent } from './containers/book-create/book-create.component';

@NgModule({
  declarations: [
    BooksComponent,
    BooksListComponent,
    BookComponent,
    FilterByAuthorPipe,
    FilterByGenrePipe,
    BookCreateComponent
  ],
  providers: [
    BooksService
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,

    BooksRoutingModule
  ]
})
export class BooksModule { }
