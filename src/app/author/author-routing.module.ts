import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../core/guards/exit.guard';

import { AuthorResolve } from './resolvers/author.resolver';
import { AuthorView } from './views/author/author.view';
import { AuthorEditContainer } from './containers/author-edit/author-edit.container';
import { AuthorShowContainer } from './containers/author-show/author-show.container';

const routes: Routes = [
  {
    path: '',
    component: AuthorView,
    resolve: {
      author: AuthorResolve
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'show'
      },
      {
        path: 'show',
        component: AuthorShowContainer
      },
      {
        path: 'edit',
        component: AuthorEditContainer,
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
export class AuthorRoutingModule { }
