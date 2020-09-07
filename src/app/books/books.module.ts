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

import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxImageCompressService } from 'ngx-image-compress';

import { BooksRoutingModule } from './books-routing.module';
import { BooksService } from './services/books.service';
import { ParamsService } from './services/params.service';
import { BooksView } from './views/books/books.view';
import { BooksListContainer } from './containers/books-list/books-list.container';
import { BookComponent } from './components/book/book.component';
import { FilterByAuthorPipe } from './pipes/filter-by-author.pipe';
import { FilterByGenrePipe } from './pipes/filter-by-genre.pipe';
import { BookCreateContainer } from './containers/book-create/book-create.container';
import { SearchTextPipe } from './pipes/search-text.pipe';
import { BookFilterContainer } from './containers/book-filter/book-filter.container';

@NgModule({
  declarations: [
    BooksView,
    BooksListContainer,
    BookComponent,
    FilterByAuthorPipe,
    FilterByGenrePipe,
    BookCreateContainer,
    SearchTextPipe,
    BookFilterContainer
  ],
  providers: [
    BooksService,
    ParamsService,
    NgxImageCompressService,
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

    ImageCropperModule,

    BooksRoutingModule
  ]
})
export class BooksModule { }
