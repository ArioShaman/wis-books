import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TranslateService } from '@ngx-translate/core';

import { GenresService } from '../../../core/services/genres.service';
import { DialogService } from '../../../core/services/dialog.service';
import { Genre } from '../../../genres/models/genre.model';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.view.html',
  styleUrls: ['./genre.view.sass']
})
export class GenreView implements OnInit, OnDestroy {

  public genre: Genre;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly genresService: GenresService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dialog: DialogService
  ) { }

  public ngOnInit(): void {
    this.genre = this.route.snapshot.data.author;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public delete(): void {
    this.dialog.openDialog({
      message: 'Are you sure you want to delete this genre?',
      type: 'multiple'
    }).pipe(takeUntil(this._destroy$))
      .subscribe(
        (res) => res ? this._delete() : null
      );
  }

  private _delete(): void {
    this.genresService.deleteGenre(this.genre.id)
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => this.router.navigate(['/genres']));
  }

}
