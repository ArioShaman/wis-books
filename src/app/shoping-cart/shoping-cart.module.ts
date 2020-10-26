import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { ShopingCartRoutingModule } from './shoping-cart-routing.module';
import { ShopingCartView } from './views/shoping-cart/shoping-cart.view';
import { ShopingCartContainer } from './containers/shoping-cart/shoping-cart.container';
import { CounterContainer } from './containers/counter/counter.container';


@NgModule({
  declarations: [
    ShopingCartView,
    ShopingCartContainer,
    CounterContainer
  ],
  imports: [
    CommonModule,
    ShopingCartRoutingModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ShopingCartModule { }
