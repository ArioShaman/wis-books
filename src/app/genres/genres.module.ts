import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenresRoutingModule } from './genres-routing.module';
import { GenresView } from './views/genres/genres.view';


@NgModule({
  declarations: [
    GenresView
  ],
  imports: [
    CommonModule,
    GenresRoutingModule
  ]
})
export class GenresModule { }
