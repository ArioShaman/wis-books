import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Author } from '../../../authors/models/author.model';
import { Book } from '../../../books/models/book.model';

@Component({
  selector: 'app-author-show',
  templateUrl: './author-show.container.html',
  styleUrls: ['./author-show.container.sass']
})
export class AuthorShowContainer implements OnInit {

  public author: Author;
  public books: Book[];

  constructor(
    private readonly route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.author = this.route.snapshot.parent.data.author;
  }

}
