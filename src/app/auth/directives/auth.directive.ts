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
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  public ngOnInit(): void {
    this._authService.isLogined()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isAuth) => {
        if (isAuth && this._condition || !isAuth && !this._condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
