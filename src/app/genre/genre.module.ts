import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { GenreRoutingModule } from './genre-routing.module';
import { GenreView } from './views/genre/genre.view';
import { GenreShowComponent } from './components/genre-show/genre-show.component';
import { GenreEditContainer } from './containers/genre-edit/genre-edit.container';
import { GenreResolve } from './resolvers/genre.resolver';


@NgModule({
  declarations: [GenreView, GenreShowComponent, GenreEditContainer],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,

    GenreRoutingModule
  ],
  providers: [
    GenreResolve
  ]
})
export class GenreModule { }
