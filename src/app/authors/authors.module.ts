import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { UIModule } from '../ui/ui.module';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import { AuthorsView } from './views/authors/authors.view';
import { AuthorsListContainer } from './containers/authors-list/authors-list.container';
import { AuthorCreateContainer } from './containers/author-create/author-create.container';


@NgModule({
  declarations: [
    AuthorsView,
    AuthorsListContainer,
    AuthorCreateContainer,
    AuthorCardComponent
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
    AuthorsRoutingModule
  ]
})
export class AuthorsModule { }
