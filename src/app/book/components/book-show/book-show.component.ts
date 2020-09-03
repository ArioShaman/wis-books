import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Book } from '../../../books/models/book.model';
import { environment } from '../../../../environments/environment';

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
    private route: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.book = this.route.snapshot.parent.data.book;
    if (this.book.image) {
      this.imageSrc = environment.hosts.imgHost + this.book.image;
    }
  }

  public showGenreBook(genre: string[]): void {
    this.router
      .navigate(['/books'], {
        queryParams: {
          genreNames: genre
        }
      }
    );
  }

}
