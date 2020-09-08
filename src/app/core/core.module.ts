import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  MatFormFieldDefaultOptions,
  MAT_FORM_FIELD_DEFAULT_OPTIONS
} from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { MatRippleModule } from '@angular/material/core';

import { AppRoutingModule } from '../app-routing.module';

import { AuthorsService } from './services/authors.service';
import { GenresService } from './services/genres.service';
import { MatAppearenceService } from './services/mat-appearence.service';
import { DomainInterceptor } from './interceptors/domain.interceptor';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'standard'
};

const appearenceFactory = () => new MatAppearenceService();

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,

    MatSelectModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatRippleModule
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    AppRoutingModule,

    MatSelectModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatRippleModule
  ],
  providers: [
    AuthorsService,
    GenresService,
    MatAppearenceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DomainInterceptor,
      multi: true
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useFactory:
        (
          appearanceService: MatAppearenceService
        ) => appearanceService.systemAppearence(),
      deps: [ MatAppearenceService ]
    }
  ]
})

export class CoreModule { }
