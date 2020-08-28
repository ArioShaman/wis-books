import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from '../../../books/models/book.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.container.html',
  styleUrls: ['./book-edit.container.sass']
})
export class BookEditContainer implements OnInit {

  public book: Book;

  constructor(
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.book = this.route.snapshot.parent.data.book;
    console.log(this.book);
  }

}
