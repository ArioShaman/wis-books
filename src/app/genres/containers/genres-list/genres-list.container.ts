import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { GenresService } from '../../../core/services/genres.service';
import { Genre } from '../../models/genre.model';

@Component({
  selector: 'app-genres-list',
  templateUrl: './genres-list.container.html',
  styleUrls: ['./genres-list.container.sass']
})
export class GenresListContainer implements OnInit, OnDestroy {

  public genres: Genre[] = [];

  private _destroy$ = new Subject<void>();


  constructor(
    private genresService: GenresService
  ) { }

  public ngOnInit(): void {
    this.getGenres();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getGenres(): void {
    this.genresService.getAllGenres()
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => this.genres = res);
  }

}
