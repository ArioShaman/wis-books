import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopingCartView } from './views/shoping-cart/shoping-cart.view'; 

const routes: Routes = [
  {
    path: '',
    component: ShopingCartView
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
export class ShopingCartRoutingModule { }
