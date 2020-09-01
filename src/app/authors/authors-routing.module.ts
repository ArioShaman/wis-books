import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorsView } from './views/authors/authors.view';

const routes: Routes = [
  {
    path: '',
    component: AuthorsView
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
