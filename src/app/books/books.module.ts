import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BooksRoutingModule } from './books-routing.module';
import { BooksService } from './services/books.service';
import { BooksComponent } from './views/books/books.component';
import { BooksListComponent } from './containers/books-list/books-list.component';
import { BookComponent } from './components/book/book.component';
import { FilterByAuthorPipe } from './pipes/filter-by-author.pipe';
import { FilterByGenrePipe } from './pipes/filter-by-genre.pipe';
import { BookCreateComponent } from './containers/book-create/book-create.component';
import { SearchTextPipe } from './pipes/search-text.pipe';
import { BookConfirmComponent } from './components/book-confirm/book-confirm.component';

@NgModule({
  declarations: [
    BooksComponent,
    BooksListComponent,
    BookComponent,
    FilterByAuthorPipe,
    FilterByGenrePipe,
    BookCreateComponent,
    SearchTextPipe,
    BookConfirmComponent
  ],
  providers: [
    BooksService,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ru-RU'
    }
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,

    BooksRoutingModule
  ]
})
export class BooksModule { }
