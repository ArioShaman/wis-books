import { Component, OnInit } from '@angular/core';

import { ICartEl } from '../../models/cart-el.interrface';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.container.html',
  styleUrls: ['./counter.container.sass']
})
export class CounterContainer implements OnInit {

  public count = 1;

  constructor() { }

  public ngOnInit(): void {
  }

  public increment(): void {
    this.count += 1;
  }

  public decrement(): void {
    if (this.count > 1) {
      this.count -= 1;
    }
  }
}
