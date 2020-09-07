import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../core/guards/exit.guard';

import { AuthView } from './views/auth/auth.view';
import { SignInContainer } from './containers/sign-in/sign-in.container';
import { SignUpContainer } from './containers/sign-up/sign-up.container';

const routes: Routes = [
  {
    path: '',
    component: AuthView,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'signIn'
      },
      {
        path: 'signIn',
        component: SignInContainer,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'signUp',
        component: SignUpContainer,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
