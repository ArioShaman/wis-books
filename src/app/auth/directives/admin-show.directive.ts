import {
  Directive,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  Input
} from '@angular/core';

import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../../core/models/user.interface';

@Directive({
  selector: '[showAdmin]'
})
export class AdminShowDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private readonly _authService: AuthService,
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef
  ) { }

  public ngOnInit(): void {
    this._authService.isLogined()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuthenticated) => {
        const user = this._authService.getCurrentUser();
        if (user.role === 'ADMIN' && isAuthenticated) {
          this._viewContainer.createEmbeddedView(this._templateRef);
        } else {
          this._viewContainer.clear();
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
