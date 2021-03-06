import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
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
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
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
