import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../../core/services/auth.service';
import { DialogService } from '../../../core/services/dialog.service';
import { IDialogBody } from '../../../core/models/dialog-body.interface';
import { SignUpForm } from '../../models/sign-up-form.model';
import { ISignUpForm } from '../../models/sign-up-form.interface';
import {
  BookErrorStateMatcher
} from '../../../core/matchers/error-state.matcher';
import { AppValidator } from '../../../core/validators/app.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.container.html',
  styleUrls: ['../sign-in/sign-in.container.sass']
})

export class SignUpContainer implements OnInit, OnDestroy {

  public signUpFormGroup: FormGroup;
  public signUpFormData = new SignUpForm();
  public matcher = new BookErrorStateMatcher();

  public submited = false;
  public leave = false;
  public loaded = false;

  private _destroy$ = new Subject<void>();

  constructor(
    public validator: AppValidator,
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly dialogService: DialogService
  ) { }

  public ngOnInit(): void {
    this.signUpFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    }, {
      validators: [this.validator.checkPasswordValidation]
    });

    this._setLoaded();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public onSubmit(cf: ISignUpForm): void {
    this.submited = true;

    Object.assign(this.signUpFormData, cf);

    if (this.signUpFormGroup.valid) {
      this.auth.signUp(this.signUpFormData)
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => this._showConfimationMessage());
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

  private _showConfimationMessage(): void {
    const data: IDialogBody = {
      message: 'Confirmation email was sended to you!',
      type: 'single'
    };

    this.dialogService.openDialog(data)
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        () => this.router.navigate(['/auth/sign-in'])
      );
  }

}
