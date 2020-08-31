import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../core/guards/exit.guard';

import { BookResolve } from './resolvers/book.resolver';
import { BookView } from './views/book/book.view';
import { BookShowComponent } from './components/book-show/book-show.component';
import { BookEditContainer } from './containers/book-edit/book-edit.container';

const routes: Routes = [
  {
    path: '',
    component: BookView,
    resolve: {
      book: BookResolve
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'details'
      },
      {
        path: 'details',
        component: BookShowComponent
      },
      {
        path: 'edit',
        component: BookEditContainer,
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
export class BookRoutingModule { }
