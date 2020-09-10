import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Genre } from '../../../genres/models/genre.model';

@Component({
  selector: 'app-genre-show',
  templateUrl: './genre-show.component.html',
  styleUrls: ['./genre-show.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenreShowComponent implements OnInit {

  public genre: Genre;

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.genre = this.route.snapshot.parent.data.author;
    console.log(this.route.snapshot.parent.data);
  }

}
