import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.view.html',
  styleUrls: ['./authors.view.sass']
})
export class AuthorsView implements OnInit, OnDestroy {

  public isHidden = false;

  private _destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router
  ) {
    this.router.events
      .pipe(takeUntil(this._destroy$))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (event.url.includes('create')) {
            this.isHidden = true;
          } else {
            this.isHidden = false;
          }
        }
      });
  }

  public ngOnInit(): void {}

  public openCreate(): void {
    this.router.navigate(['/authors/create']);
  }


  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
