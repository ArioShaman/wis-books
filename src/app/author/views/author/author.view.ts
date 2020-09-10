import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DialogService } from '../../../core/services/dialog.service';
import { AuthorsService } from '../../../core/services/authors.service';
import { Author } from '../../../authors/models/author.model';

@Component({
  selector: 'app-author',
  templateUrl: './author.view.html',
  styleUrls: ['./author.view.sass']
})
export class AuthorView implements OnInit, OnDestroy {

  public author: Author;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly authorsService: AuthorsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dialog: DialogService
  ) { }

  public ngOnInit(): void {
    this.author = this.route.snapshot.data.author;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public delete(): void {
    this.dialog.openDialog({
      message: 'Are you sure you want to delete this author?',
      type: 'multiple'
    })
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (res) => res ? this._delete() : null
      );
  }

  private _delete(): void {
    this.authorsService.deleteAuthor(this.author.id)
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => this.router.navigate(['/authors']));
  }

}
