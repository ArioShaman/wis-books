import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsView } from './views/authors/authors.view';
import { AuthorCardComponent } from './components/author-card/author-card.component';
import { AuthorsListContainer } from './containers/authors-list/authors-list.container';
import { AuthorCreateContainer } from './containers/author-create/author-create.container';


@NgModule({
  declarations: [
    AuthorsView,
    AuthorCardComponent,
    AuthorsListContainer,
    AuthorCreateContainer
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatSnackBarModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,

    AuthorsRoutingModule
  ]
})
export class AuthorsModule { }
