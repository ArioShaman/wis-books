import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../core/guards/exit.guard';

import { AuthorsView } from './views/authors/authors.view';
import { AuthorsListContainer } from './containers/authors-list/authors-list.container';
import { AuthorCreateContainer } from './containers/author-create/author-create.container';

const routes: Routes = [
  {
    path: '',
    component: AuthorsView,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: AuthorsListContainer,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'create',
        component: AuthorCreateContainer,
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
export class AuthorsRoutingModule { }
