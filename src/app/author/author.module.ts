import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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


@NgModule({
  declarations: [
    AuthorShowComponent,
    AuthorEditContainer,
    AuthorView
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,

    AuthorRoutingModule
  ],
  providers: [
    AuthorResolve
  ]
})
export class AuthorModule { }
