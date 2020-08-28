import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books'
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then((m) => m.BooksModule)
  },
  {
    path: 'books/:id',
    loadChildren: () => import('./book/book.module').then((m) => m.BookModule)
  },
  {
    path: 'genres',
    loadChildren: () => import('./genres/genres.module').then((m) => m.GenresModule)
  },
  {
    path: 'authors',
    loadChildren: () => import('./authors/authors.module').then((m) => m.AuthorsModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
