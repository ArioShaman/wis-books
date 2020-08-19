import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { AuthorsService } from './services/authors.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    AppRoutingModule,
    CommonModule,
  ],
  providers: [
    AuthorsService,
  ],
})
export class CoreModule { }
