import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Genre } from '../../../genres/models/genre.model';

@Component({
  selector: 'app-genre-show',
  templateUrl: './genre-show.container.html',
  styleUrls: ['./genre-show.container.sass'],
})
export class GenreShowContainer implements OnInit {

  public genre: Genre;

  constructor(
    private readonly route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.genre = this.route.snapshot.parent.data.author;
  }

}
