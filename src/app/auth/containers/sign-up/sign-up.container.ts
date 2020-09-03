import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn
} from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';


import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { DialogService } from '../../../core/services/dialog.service';
import { IDialogBody } from '../../../core/models/dialog-body.interface';
import { ISignUpForm } from '../../models/sign-up-form.interface';
import {
  BookErrorStateMatcher
} from '../../../core/matchers/error-state.matcher';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.container.html',
  styleUrls: ['./sign-up.container.sass']
})
export class SignUpContainer implements OnInit, OnDestroy {

  public signUpForm: FormGroup;
  public matcher = new BookErrorStateMatcher();

  public submited = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private dialogService: DialogService
  ) { }

  public ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    }, {
      validators: [this.checkPasswordValidation]
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onSubmit(cf: ISignUpForm): void {
    this.submited = true;
    if (this.signUpForm.valid) {
      this.auth.signUp(cf)
        .pipe(
          map((res) => {
            const data: IDialogBody = {
              message: 'Confirmation email was sended to you!',
              type: 'single'
            };
            this.dialogService.openDialog(data)
              .pipe(
                takeUntil(this.destroy$)
              ).subscribe(
                () => this.router.navigate(['/auth/signIn'])
              );
          }),
          takeUntil(this.destroy$)
        ).subscribe();
    }
  }

  public checkPasswordValidation: ValidatorFn =
  (control: FormGroup): null => {
    const password = control.get('password');
    const passwordConfirmation = control.get('passwordConfirmation');
    if (password.value !== passwordConfirmation.value) {
      passwordConfirmation.setErrors({ confirmationInvalid: true });
    }

    return null;
  }

}
