import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenresView } from './views/genres/genres.view';

const routes: Routes = [
  {
    path: '',
    component: GenresView
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class GenresRoutingModule { }
