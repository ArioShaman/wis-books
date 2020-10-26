import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../../core/services/auth.service';
import { ISignInForm } from '../../models/sign-in-form.interface';
import {
  BookErrorStateMatcher
} from '../../../core/matchers/error-state.matcher';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.container.html',
  styleUrls: ['./sign-in.container.sass']
})
export class SignInContainer implements OnInit, OnDestroy {

  public leave = false;
  public loaded = false;
  public submited = false;

  public signInForm: FormGroup;
  public matcher = new BookErrorStateMatcher();
  private _destroy$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) { }

  public ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this._setLoaded();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(cf: ISignInForm): void {
    this.submited = true;

    if (this.signInForm.valid) {
      this.auth.fakeSignIn(cf)
        .pipe(takeUntil(this._destroy$))
        .subscribe(
          (res) => {
            if (res) {
              this.router.navigate(['/books']);
            }
          });
    }
  }

  public canDeactivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.leave = true;
      setTimeout(() => resolve(true), 900);
    });
  }

  private _setLoaded(): void {
    setTimeout(() => this.loaded = true, 600);
  }

}
