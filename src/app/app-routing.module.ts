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
    path: 'genres/details/:id',
    loadChildren: () => import('./genre/genre.module').then((m) => m.GenreModule)
  },
  {
    path: 'authors',
    loadChildren: () => import('./authors/authors.module').then((m) => m.AuthorsModule)
  },
  {
    path: 'authors/details/:id',
    loadChildren: () => import('./author/author.module').then((m) => m.AuthorModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then((m) => m.AccountModule)
  },
  {
    path: 'account/form',
    loadChildren: () => import('./account-info-form/account-info-form.module').then((m) => m.AccountInfoFormModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      scrollPositionRestoration: 'top',
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
