import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenresRoutingModule } from './genres-routing.module';
import { GenresComponent } from './views/genres/genres.component';


@NgModule({
  declarations: [GenresComponent],
  imports: [
    CommonModule,
    GenresRoutingModule,
  ],
})
export class GenresModule { }
