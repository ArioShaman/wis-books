import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ShopingCartService } from '../../../shoping-cart/services/shoping-cart.service';

@Component({
  selector: 'app-cart-counter',
  templateUrl: './cart-counter.container.html',
  styleUrls: ['./cart-counter.container.sass']
})
export class CartCounterContainer implements OnInit {

  public count$: Observable<number>;
  public price$: Observable<number>;

  constructor(
    private _cartService: ShopingCartService
  ) { }

  public ngOnInit(): void {
    this.count$ = this._cartService.getTotalCount();
    this.price$ = this._cartService.getTotalPrice();
  }

}
