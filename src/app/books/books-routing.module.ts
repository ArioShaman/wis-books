import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksView } from './views/books/books.view';


const routes: Routes = [
  {
    path: '',
    component: BooksView
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
export class BooksRoutingModule { }
