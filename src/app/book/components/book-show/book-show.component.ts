import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../../../books/models/book.model';
import { environment } from '../../../../environments/environment';
import { ShopingCartService } from '../../../shoping-cart/services/shoping-cart.service';
import { ICartEl } from '../../../shoping-cart/models/cart-el.interrface';

@Component({
  selector: 'book-show',
  templateUrl: './book-show.component.html',
  styleUrls: ['./book-show.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookShowComponent implements OnInit {

  public book: Book;
  public imageSrc: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly _shopingCartService: ShopingCartService
  ) { }

  public ngOnInit(): void {
    this.book = this.route.snapshot.parent.data.book;

    if (this.book.image) {
      this.imageSrc = environment.hosts.imgHost + this.book.image;
    }
  }

  public showGenreBook(genre: string[]): void {
    const queryParams = {
      genreNames: genre,
      page: 1
    };

    this.router
      .navigate(['/books'], { queryParams });
  }

  public addToCart(): void {
    const cartEl: ICartEl = {
      book: this.book,
      count: 1
    };

    this._shopingCartService.openModal(cartEl);
  }

}
