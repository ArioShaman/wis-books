import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from '../app-routing.module';

import { AuthorsService } from './services/authors.service';
import { GenresService } from './services/genres.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,

    AppRoutingModule,
  ],
  exports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,

    AppRoutingModule,
  ],
  providers: [
    AuthorsService,
    GenresService,
  ],
})
export class CoreModule { }
