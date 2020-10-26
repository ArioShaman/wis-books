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

@Directive({
  selector: '[showAuth]'
})
export class AuthDirective implements OnInit, OnDestroy {

  @Input()
  set showAuth(condition: boolean) {
    this._condition = coerceBooleanProperty(condition);
  }

  private destroy$ = new Subject<void>();
  private _condition = true;


  constructor(
    private readonly _authService: AuthService,
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef
  ) { }

  public ngOnInit(): void {
    // console.log('hey');
    this._authService.isLogined()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuth) => {
        if (isAuth && this._condition || !isAuth && !this._condition) {
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
