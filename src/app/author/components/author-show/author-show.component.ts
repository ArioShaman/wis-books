import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { Author } from '../../../authors/models/author.model';
import { Book } from '../../../books/models/book.model';

@Component({
  selector: 'app-author-show',
  templateUrl: './author-show.component.html',
  styleUrls: ['./author-show.component.sass']
})
export class AuthorShowComponent implements OnInit {

  public author: Author;
  public books: Book[];


  constructor(
    private readonly route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.author = this.route.snapshot.parent.data.author;
  }


}
