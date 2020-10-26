import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IShopingCartItem } from '../models/shoping-cart-item.interface';
import { ICartEl } from '../models/cart-el.interrface';
import { CounterContainer } from '../containers/counter/counter.container';

@Injectable({
  providedIn: 'root'
})
export class ShopingCartService {

  private _cart: IShopingCartItem[] = [];

  private _totalPrice = 0;
  private _totalCount = 0;

  private _totalPrice$ = new BehaviorSubject<number>(this._totalPrice);
  private _totalCount$ = new BehaviorSubject<number>(this._totalCount);

  private _destroy$ = new Subject<void>();

  constructor(
    public dialog: MatDialog
  ) {
    if (localStorage.getItem('cart').length > 0) {
      const cart = JSON.parse(localStorage.getItem('cart'));
      if (Array.isArray(cart)) {
        this._cart = cart;
      }
    }

    this._calculate();
  }

  public openModal(cartEl: ICartEl): void {
    const dialogRef = this.dialog.open(CounterContainer);

    dialogRef.afterClosed()
      .pipe(takeUntil(this._destroy$))
      .subscribe((count) => {
        cartEl.count = count;
        this._addToCart(cartEl);
      });
  }

  public getTotalPrice(): Observable<number> {
    return this._totalPrice$.asObservable();
  }

  public getTotalCount(): Observable<number> {
    return this._totalCount$.asObservable();
  }

  private _addToCart(cartEl: ICartEl): void {
    const index = this._cart.findIndex(
      (cartElm) => cartElm.bookId === cartEl.book.id
    );

    let cartItem: IShopingCartItem;

    if (index >= 0) {
      cartItem = this._cart[index];
      cartItem.count += cartEl.count;
      cartItem.totalPrice += cartEl.book.price * cartEl.count;
    } else {
      cartItem = {
        bookId: cartEl.book.id,
        count: cartEl.count,
        totalPrice: cartEl.book.price * cartEl.count
      };
      this._cart.push(cartItem);
    }

    this._calculate();

    localStorage.setItem('cart', JSON.stringify(this._cart));
  }

  private _calculate(): void {
    let price = 0;
    let count = 0;

    this._cart.forEach((cartEl) => {
      price += cartEl.totalPrice;
      count += cartEl.count;
    });

    this._totalCount = count;
    this._totalPrice = price;

    this._totalCount$.next(this._totalCount);
    this._totalPrice$.next(this._totalPrice);
  }

}
