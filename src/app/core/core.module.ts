import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from '../app-routing.module';

import { AuthorsService } from './services/authors.service';
import { GenresService } from './services/genres.service';
import { DomainInterceptor } from './interceptors/domain.interceptor';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,

    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    AppRoutingModule,

    MatSidenavModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    AuthorsService,
    GenresService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DomainInterceptor,
      multi: true
    }
  ]
})

export class CoreModule { }
