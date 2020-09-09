import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { SignUpForm } from '../models/sign-up-form.model';

import { ISignInForm } from './../models/sign-in-form.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public signIn(data: ISignInForm): Observable<any> {
    const uri = '/login';

    return this.http.post(uri, data);
  }

  public signUp(data: SignUpForm): Observable<any> {
    const formData = data._toJSON();

    const uri = '/registration';

    return this.http.post(uri, formData);
  }
}
