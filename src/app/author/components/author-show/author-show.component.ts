import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Author } from '../../../authors/models/author.model';

@Component({
  selector: 'app-author-show',
  templateUrl: './author-show.component.html',
  styleUrls: ['./author-show.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorShowComponent implements OnInit {

  public author: Author;

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.author = this.route.snapshot.parent.data.author;
  }

}
