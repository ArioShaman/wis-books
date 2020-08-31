import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ISignUpForm } from './../models/sign-up-form.interface';
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

  public signUp(data: ISignUpForm): Observable<any> {
    const formData = this._convertSignInData(data);
    const uri = '/registration';

    return this.http.post(uri, formData);
  }

  private _convertSignInData(data: ISignUpForm): Object {
    // tslint:disable-next-line: no-unnecessary-local-variable
    const formData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      password_confirmation: data.passwordConfirmation
    };

    return formData;
  }

}
