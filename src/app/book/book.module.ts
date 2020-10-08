import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TranslateModule } from '@ngx-translate/core';
import { NgxImageCompressService } from 'ngx-image-compress';

import { CanDeactivateGuard } from '../core/guards/exit.guard';
import { UIModule } from '../ui/ui.module';

import { BookRoutingModule } from './book-routing.module';
import { BookResolve } from './resolvers/book.resolver';
import { BookView } from './views/book/book.view';
import { BookShowComponent } from './components/book-show/book-show.component';
import { BookEditContainer } from './containers/book-edit/book-edit.container';
import { BookDeleteComponent } from './components/book-delete/book-delete.component';
import { LocalizedDatePipe } from './pipes/localized-date.pipe';


@NgModule({
  declarations: [
    BookView,
    BookShowComponent,
    BookEditContainer,
    BookDeleteComponent,

    LocalizedDatePipe
  ],
  imports: [
    // angular
    CommonModule,
    ReactiveFormsModule,

    // material
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,

    // third party
    TranslateModule.forRoot({ defaultLanguage: 'ru' }),

    // custom
    BookRoutingModule,
    UIModule
  ],
  providers: [
    BookResolve,
    CanDeactivateGuard,
    NgxImageCompressService,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ru-RU'
    }
  ]
})
export class BookModule { }
