import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthorsService } from '../../../core/services/authors.service';
import { Author } from '../../models/author.model';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.container.html',
  styleUrls: ['./authors-list.container.sass']
})
export class AuthorsListContainer implements OnInit, OnDestroy {

  public authors: Author[] = [];

  private _destroy$ = new Subject<void>();

  constructor(
    private authorsService: AuthorsService
  ) { }

  public ngOnInit(): void {
    this.getAuthors();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public getAuthors(): void {
    this.authorsService.getAllAuthors()
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => this.authors = res);
  }

}
