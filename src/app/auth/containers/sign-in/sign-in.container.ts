import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { ISignInForm } from '../../models/sign-in-form.interface';
import {
  BookErrorStateMatcher
} from '../../../core/matchers/error-state.matcher';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.container.html',
  styleUrls: ['./sign-in.container.sass']
})
export class SignInContainer implements OnInit {

  public signInForm: FormGroup;
  public matcher = new BookErrorStateMatcher();

  public submited: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  public ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(cf: ISignInForm): void {
    this.submited = true;
    if (this.signInForm.valid) {
      this.auth.signIn(cf)
        .pipe(
          takeUntil(this.destroy$)
        ).subscribe(
          res => console.log(res)
        );
    }
  }

}
