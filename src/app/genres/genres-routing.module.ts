import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../core/guards/exit.guard';

import { GenresView } from './views/genres/genres.view';
import { GenresListContainer } from './containers/genres-list/genres-list.container';
import { GenreCreateContainer } from './containers/genre-create/genre-create.container';

const routes: Routes = [
  {
    path: '',
    component: GenresView,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: GenresListContainer,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'create',
        component: GenreCreateContainer,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
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
