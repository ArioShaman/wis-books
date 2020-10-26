import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Author } from '../../models/author.model';

@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.component.html',
  styleUrls: ['./author-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorCardComponent implements OnInit {

  @Input('author')
  public author: Author;

  constructor() { }

  public ngOnInit(): void {
  }

}
