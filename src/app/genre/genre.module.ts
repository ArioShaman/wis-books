import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { UIModule } from '../ui/ui.module';

import { GenreRoutingModule } from './genre-routing.module';
import { GenreView } from './views/genre/genre.view';
import { GenreShowContainer } from './containers/genre-show/genre-show.container';
import { GenreEditContainer } from './containers/genre-edit/genre-edit.container';
import { GenreResolve } from './resolvers/genre.resolver';
import { GenreBooksListContainer } from './containers/genre-books-list/genre-books-list.container';


@NgModule({
  declarations: [
    GenreView,
    GenreShowContainer,
    GenreEditContainer,
    GenreBooksListContainer
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,

    UIModule,

    GenreRoutingModule
  ],
  providers: [
    GenreResolve
  ]
})
export class GenreModule { }
