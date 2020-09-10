import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../core/guards/exit.guard';

import { GenreResolve } from './resolvers/genre.resolver';
import { GenreView } from './views/genre/genre.view';
import { GenreEditContainer } from './containers/genre-edit/genre-edit.container';
import { GenreShowComponent } from './components/genre-show/genre-show.component';


const routes: Routes = [
  {
    path: '',
    component: GenreView,
    resolve: {
      author: GenreResolve
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'show'
      },
      {
        path: 'show',
        component: GenreShowComponent
      },
      {
        path: 'edit',
        component: GenreEditContainer,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenreRoutingModule { }
