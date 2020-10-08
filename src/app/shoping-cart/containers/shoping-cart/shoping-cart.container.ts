import { Component, OnInit } from '@angular/core';

import { ShopingCartService } from '../../services/shoping-cart.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.container.html',
  styleUrls: ['./shoping-cart.container.sass']
})
export class ShopingCartContainer implements OnInit {

  constructor(
    private readonly _shopingCartService: ShopingCartService
  ) { }

  public ngOnInit(): void {
  }

}
