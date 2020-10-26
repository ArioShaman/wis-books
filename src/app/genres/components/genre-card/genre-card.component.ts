import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Genre } from '../../models/genre.model';

@Component({
  selector: 'app-genre-card',
  templateUrl: './genre-card.component.html',
  styleUrls: ['./genre-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreCardComponent implements OnInit {

  @Input('genre')
  public genre: Genre;

  constructor() { }

  public ngOnInit(): void {
  }

}
