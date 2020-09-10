import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthorRoutingModule } from './author-routing.module';
import { AuthorShowComponent } from './components/author-show/author-show.component';
import { AuthorEditContainer } from './containers/author-edit/author-edit.container';
import { AuthorView } from './views/author/author.view';
import { AuthorResolve } from './resolvers/author.resolver';
import { AuthorBooksListContainer } from './containers/author-books-list/author-books-list.container';
import { AuthorBookCardComponent } from './components/author-book-card/author-book-card.component';


@NgModule({
  declarations: [
    AuthorShowComponent,
    AuthorEditContainer,
    AuthorView,
    AuthorBooksListContainer,
    AuthorBookCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatPaginatorModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,

    AuthorRoutingModule
  ],
  providers: [
    AuthorResolve
  ]
})
export class AuthorModule { }
