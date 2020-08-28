import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';

import { TranslateModule } from '@ngx-translate/core';

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

    // material
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,

    // third party
    TranslateModule.forRoot({ defaultLanguage: 'ru' }),

    // custom
    BookRoutingModule,
  ],
  providers: [
    BookResolve
  ]
})
export class BookModule { }
