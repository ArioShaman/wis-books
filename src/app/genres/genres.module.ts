import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { UIModule } from '../ui/ui.module';

import { GenresRoutingModule } from './genres-routing.module';
import { GenresView } from './views/genres/genres.view';
import { GenreCreateContainer } from './containers/genre-create/genre-create.container';
import { GenresListContainer } from './containers/genres-list/genres-list.container';
import { GenreCardComponent } from './components/genre-card/genre-card.component';


@NgModule({
  declarations: [
    GenresView,
    GenreCreateContainer,
    GenresListContainer,
    GenreCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,

    UIModule,
    GenresRoutingModule
  ]
})
export class GenresModule { }
